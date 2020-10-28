<template>
  <div>
    <ul class="wheel">
      <li
        v-for="(position, index) in positionToId"
        :key="index" class="wheel-item"
        :style="{transform: `rotateZ(${slots === 0 ? 0: 360 / slots * index}deg)`}"
      >
        <span class="wheel-number">{{position}}</span>
      </li>
    </ul>
    <div class="timer">
      <h2>Countdown until the next game</h2>
      {{countDownValue ? countDownValue : 'not counting' }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import axios from 'axios'
import { NEXT_GAME_PATH, WHEEL_CONFIG_PATH } from '@/constants'

@Component({

})
export default class Home extends Vue {
  @Prop() apiUrl!: string
  public colors = [];
  public name = '';
  public positionToId = [];
  public results = [];
  public slots = 0;

  public countDownIntervalId;
  public countDownValue = 0;

  mounted () {
    axios
      .get(`${this.apiUrl}${WHEEL_CONFIG_PATH}`)
      .then(response => {
        const data = response.data
        this.slots = data.slots
        this.positionToId = data.positionToId

        this.getNextGame(this.initCountdown)
      // public colors = [];
      // public name = '';
      // public positionToId = '';
      // public results = [];
      })
    // SPIN_BY_UUID_PATH
  }

  getNextGame (callback) {
    axios
      .get(`${this.apiUrl}${NEXT_GAME_PATH}`)
      .then(response => callback(response.data))
  }

  initCountdown (data) {
    this.countDown(data.fakeStartDelta)
  }

  countDown (seconds) {
    this.countDownValue = seconds

    this.countDownIntervalId = setInterval(() => {
      this.countDownValue--

      if (this.countDownValue === 0) {
        clearInterval(this.countDownIntervalId)
      }
    }, 1000)
  }

  updated () {
    console.log(this.apiUrl)
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
