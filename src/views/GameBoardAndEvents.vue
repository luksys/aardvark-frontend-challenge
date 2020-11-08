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
            'is-selected': position === currentSpinResult,
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
      <h3 v-if="!CountdownTimerValue">Awaiting for result...</h3>
      <div v-else class="timer">{{ CountdownTimerValue }}</div>
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
            <tr v-if="!RecordedSpins.length">
              <td colspan="4" class="text-center">No Records Found</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { getNextGame, getSpin } from '@/services'
import RecordedSpinsModel from '@/models/RecordedSpinsModel'
import { createActionLogEntry } from '@/utilities'

@Component
export default class GameBoardAndEvents extends Vue {
  @Prop() apiUrl!: string

  private wheelSpinIntervalId = -1
  private wheelRotationAngle = 0

  private currentSpinResult = -1
  private currentSpinResultIntervalId = -1

  @Watch('apiUrl')
  watchAPIUrl (next: string) {
    if (next.trim() !== '') {
      // this.init()
    }
  }

  @Watch('WheelIsSpinning')
  watchWheelIsSpinning (next: boolean) {
    if (next) {
      this.wheelSpinIntervalId = setInterval(() => this.wheelRotationAngle++, 50)
    } else {
      clearInterval(this.wheelSpinIntervalId)
    }
  }

  @Watch('CurrentSpinResult')
  watchCurrentSpinResult (next: number | null) {
    if (next === null) return

    this.currentSpinResult = next

    this.currentSpinResultIntervalId = setInterval(() => {
      this.currentSpinResult = -1
      clearInterval(this.currentSpinResultIntervalId)
    }, 2500)
  }

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

  get WheelIsSpinning () {
    return this.$store.state.wheel.isSpinning
  }

  get CountdownTimerValue () {
    return this.$store.state.countdownTimer.value
  }

  get CurrentSpinResult () {
    return this.$store.state.currentSpin.result
  }

  mounted () {
    this.$store.dispatch('addActionsLogItem', createActionLogEntry('GameBoardAndEvents mounted')).then()
  }

  // resetIntervals () {
  //   clearInterval(this.countDownIntervalId)
  //   clearInterval(this.wheelSpinIntervalId)
  //   clearInterval(this.spinResultAvailableIntervalId)
  // }
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
  .timer {
    font-size: 48px;
  }
</style>
