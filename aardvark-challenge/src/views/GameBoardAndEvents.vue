<template>
  <div>
    {{selectedPositionIdIndex}}
    <ul
      class="wheel"
      :style="{transform: `rotateZ(${wheelRotationAngle}deg)`}"
    >
      <li
        v-for="(position, index) in positionToId"
        :key="index"
        class="wheel-item"
        v-bind:class="{'is-selected': selectedPositionIdIndex > -1 && index === selectedPositionIdIndex, 'haha': true}"
        :style="{transform: `rotateZ(${slots === 0 ? 0: 360 / slots * index}deg)`}"
      >
        <span class='wheel-number'>{{position}}</span>
      </li>
    </ul>
    <div class="timer">
      <h2>Countdown until the next game</h2>
      {{ countDownValue ? countDownValue : 'Awaiting for result...' }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import axios from 'axios'
import { NEXT_GAME_PATH, SPIN_BY_UUID_PATH, WHEEL_CONFIG_PATH } from '@/constants'

@Component({

})
export default class Home extends Vue {
  @Prop() apiUrl!: string
  public colors = [];
  public name = '';
  public positionToId = [];
  public results = [];
  public slots = 0;
  public nextGameData = {};

  public countDownIntervalId;
  public countDownValue = 0;

  public wheelSpinIntervalId;
  public wheelRotationAngle = 0;

  public spinResultAvailableIntervalId;
  public selectedPositionIdIndex = -1;

  mounted () {
    this.getWheelConfig().then(response => {
      const data = response.data
      this.slots = data.slots
      this.positionToId = data.positionToId

      this.getNextGame()
        .then((response) => this.handleNextGameFetchResult(response.data))
    // public colors = [];
    // public name = '';
    // public positionToId = '';
    // public results = [];
    })
  // SPIN_BY_UUID_PATH
  }

  getWheelConfig () {
    return axios.get(`${this.apiUrl}${WHEEL_CONFIG_PATH}`)
  }

  getNextGame () {
    return axios.get(`${this.apiUrl}${NEXT_GAME_PATH}`)
  }

  getSpin (uuid) {
    return axios.get(`${this.apiUrl}${SPIN_BY_UUID_PATH}/${uuid}`)
  }

  getSpinUntilAvailable (seconds) {
    setTimeout(() => {
      this.getSpin(this.nextGameData.uuid)
        .then((response) => {
          const data = response.data
          if (data.result || data.result === 0) {
            this.selectedPositionIdIndex = data.result
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
    this.wheelSpinIntervalId = setInterval(() => {
      this.wheelRotationAngle++
    }, 50)
  }

  endSpinWheel () {
    clearInterval(this.wheelSpinIntervalId)
  }

  handleNextGameFetchResult (data) {
    this.nextGameData = data
    this.initCountdown(this.nextGameData)
  }

  handleCountdownFinish () {
    this.startSpinWheel()
    let waitSeconds = this.nextGameData.startDelta - this.nextGameData.fakeStartDelta

    if (waitSeconds > 0) {
      this.spinResultAvailableIntervalId = setInterval(() => {
        waitSeconds--

        if (waitSeconds === 0) {
          clearInterval(this.spinResultAvailableIntervalId)
          this.getSpinUntilAvailable(5000)
        }
      }, 1000)
    }
  }

  handleInitNewGame () {
    setTimeout(() => {
      this.selectedPositionIdIndex = -1
    }, 2000)
    this.endSpinWheel()
    this.getNextGame()
      .then((response) => this.handleNextGameFetchResult(response.data))
  }
}
</script>

<style>
  .wheel {
    display: block;
    height: 350px;
    width: 350px;
    position: relative;
    padding: 0;
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
  .wheel-item.is-selected .wheel-number {
    color: red;
    font-weight: bold;
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
    font-size: 32px;
  }
</style>
