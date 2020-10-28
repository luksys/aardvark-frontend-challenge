<template>
  <div>
    {{slots}}
    <div>{{apiUrl}}</div>
    <ul class="wheel">
      <li v-for="(value, index) in positionToId" :key="index" class="wheel-item" :style="{transform: `rotateZ(${360/slots*index}deg)`}">
        <span class="wheel-number">{{value}}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import axios from 'axios'

@Component({

})
export default class Home extends Vue {
  @Prop() apiUrl!: string
  public colors = [];
  public name = '';
  public positionToId = [];
  public results = [];
  public slots = 1;

  mounted () {
    axios
      .get('https://dev-games-backend.advbet.com/v1/ab-roulette/1/configuration')
      .then(response => {
        const data = response.data
        this.slots = data.slots
        this.positionToId = data.positionToId
      // public colors = [];
      // public name = '';
      // public positionToId = '';
      // public results = [];
      })
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
</style>
