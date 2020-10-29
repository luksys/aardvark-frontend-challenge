<template>
  <div class="d-flex flex-wrap">
    <section class="col-6">
      <h2>Game Board</h2>
      <ul
        class="wheel"
        :style="{transform: `rotateZ(${wheelRotationAngle}deg)`}"
      >
        <li
          v-for="(position, index) in PositionToId"
          class="wheel-item"
          :class="{
            'is-selected': selectedPositionIdIndex > -1 && index === selectedPositionIdIndex,
            'border-top-color-red': Colors[index] === 'red',
            'border-top-color-black': Colors[index] === 'black',
            'border-top-color-green': Colors[index] === 'green'
          }"
          :key="index"
          :style="{transform: 'rotateZ(' + 360 / Slots * index + 'deg)'}"
        >
          <span class='wheel-number'>{{ position }}</span>
        </li>
      </ul>
    </section>

    <section class="col-6">
      <h2>Countdown until the next game</h2>
      <h3 class="timer">
        {{ countDownValue ? countDownValue : 'Awaiting for result...' }}
      </h3>
    </section>

    <section class="col">
      <div>
        <h2>Recorded Spins</h2>
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>UUID</th>
            <th>Result</th>
            <th>Start time</th>
          </tr>
          </thead>
          <tbody>
          <tr
            v-for="(spin, index) in RecordedSpins"
            :key="index">
            <td>{{ spin.id }}</td>
            <td>{{ spin.uuid }}</td>
            <td>{{ spin.result }}</td>
            <td>{{ spin.startTime }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { getNextGame, getSpin } from '@/services'
import RecordedSpinsModel from '@/models/RecordedSpinsModel'
import ConfigModel from '@/models/ConfigModel'
import { createActionLogEntry } from '@/utilities'

@Component({

})
export default class GameBoardAndEvents extends Vue {
  @Prop() apiUrl!: string
  private config: ConfigModel = {};
  private gameData = {};

  private countDownIntervalId;
  private countDownValue = 0;

  private wheelSpinIntervalId;
  private wheelRotationAngle = 0;

  private spinResultAvailableIntervalId;
  private selectedPositionIdIndex = -1;

  get RecordedSpins (): RecordedSpinsModel[] {
    return this.$store.state.recordedSpins
  }

  get PositionToId () {
    return this.$store.state.config.positionToId
  }

  get Slots () {
    return this.$store.state.config.slots
  }

  get Colors () {
    return this.$store.state.config.colors
  }

  get Results () {
    return this.$store.state.config.results
  }

  mounted () {
    this.$store.dispatch('addActionsLogItem', createActionLogEntry('GameBoardAndEvents mounted')).then()
    if (this.PositionToId) {
      getNextGame(this.apiUrl).then((response) => this.handleNextGameFetchResult(response.data))
    } else {
      this.$store.watch(
        state => state.config.PositionToId,
        () => {
          getNextGame(this.apiUrl).then((response) => this.handleNextGameFetchResult(response.data))
        }
      )
    }
  }

  getSpinUntilAvailable (seconds) {
    this.$store.dispatch('addActionsLogItem', createActionLogEntry('Getting spin until result is available')).then()
    setTimeout(() => {
      getSpin(this.apiUrl, this.gameData.uuid)
        .then((response) => {
          const data = response.data
          if (data.result || data.result === 0) {
            this.selectedPositionIdIndex = this.Results.findIndex((result) => +result === data.result)
            this.$store.dispatch('addRecordedSpin', data)
            this.handleInitNewGame()
          } else {
            this.getSpinUntilAvailable(seconds)
          }
        })
        .catch((error) => console.log(error))
    }, seconds)
  }

  initCountdown (data) {
    this.countDown(data.fakeStartDelta, this.handleCountdownFinish)
  }

  countDown (seconds, endCallback) {
    this.countDownValue = seconds

    this.countDownIntervalId = setInterval(() => {
      this.countDownValue--

      if (this.countDownValue === 0) {
        clearInterval(this.countDownIntervalId)
        if (endCallback) endCallback()
      }
    }, 1000)
  }

  startSpinWheel () {
    this.$store.dispatch('addActionsLogItem', createActionLogEntry('Spinning the wheel')).then()
    this.wheelSpinIntervalId = setInterval(() => {
      this.wheelRotationAngle++
    }, 50)
  }

  endSpinWheel () {
    this.$store.dispatch('addActionsLogItem', createActionLogEntry('Stopped spinning the wheel')).then()
    clearInterval(this.wheelSpinIntervalId)
  }

  handleNextGameFetchResult (data) {
    this.gameData = data
    this.initCountdown(this.gameData)
  }

  handleCountdownFinish () {
    this.startSpinWheel()
    let waitSeconds = this.gameData.startDelta - this.gameData.fakeStartDelta

    if (waitSeconds > 0) {
      this.spinResultAvailableIntervalId = setInterval(() => {
        waitSeconds--

        if (waitSeconds === 0) {
          clearInterval(this.spinResultAvailableIntervalId)
          this.getSpinUntilAvailable(2000)
        }
      }, 1000)
    }
  }

  handleInitNewGame () {
    setTimeout(() => {
      this.selectedPositionIdIndex = -1
    }, 2500)
    this.endSpinWheel()
    getNextGame(this.apiUrl)
      .then((response) => this.handleNextGameFetchResult(response.data))
  }
}
</script>

<style lang="scss">
  .wheel {
    display: block;
    height: 350px;
    width: 350px;
    position: relative;
    padding: 0;
    margin: 0 auto;
    list-style-type: none;
  }
  .wheel-item {
    position: absolute;
    list-style-type: none;
    margin: 0;
    padding: 0;

    width: 32px;
    height: 175px;
    display: inline-block;
    text-align: center;
    top: 0;
    left: calc(50% - (32px/2));
    -webkit-transform-origin: 50% 100%;
    transform-origin: 50% 100%;
    background-color: transparent;
    border-left: 16px solid transparent;
    border-right: 16px solid transparent;
    border-top: 175px solid black;
    box-sizing: border-box;
  }
  .wheel-item {
    &.is-selected {
      animation: pulse 0.5s 4;
    }
  }
  .wheel-number {
    color: #fff;
    padding-top: 12px;
    width: 32px;
    display: inline-block;
    font-size: 12px;
    -webkit-transform: scale(1, 1.8);
    transform: scale(1, 1.8);
    position: absolute;
    top: -175px;
    left: -16px;
  }
</style>
