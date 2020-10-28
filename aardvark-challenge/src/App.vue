<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Game Board and Events</router-link> |
      <router-link to="/statistics-and-action-logs">Statistics and Actions Log</router-link>
    </div>
    <div>
      <form>
        <label for="api-url"></label>
        <input v-model="apiUrl" id="api-url" placeholder="Add API url">
        <p>Message is: {{ apiUrl }}</p>
      </form>
    </div>
    <router-view
      :api-url="apiUrl"
      :position-to-id="positionToId"
      :slots="slots"
      :colors="colors"
      :results="results"
      :stats="spinStats"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { DEFAULT_API_URL } from '@/constants'
import { getSpinStats, getWheelConfig } from '@/services'
import { createActionLogEntry } from '@/utilities'

@Component({

})
export default class App extends Vue {
  private apiUrl = DEFAULT_API_URL;

  private colors = [];
  private positionToId = [];
  private results = [];
  private slots = 0;

  private spinStats = [];

  mounted () {
    this.$store.dispatch('addActionsLogItem', createActionLogEntry('App component mounted'))
    getWheelConfig(this.apiUrl).then(response => {
      const data = response.data
      this.slots = data.slots
      this.positionToId = data.positionToId
      this.colors = data.colors
      this.results = data.results

      // this.getNextGame()
      //   .then((response) => this.handleNextGameFetchResult(response.data))
      // public colors = [];
      // public name = '';
      // public positionToId = '';
      // public results = [];
    })
    this.updateSpinStats()
  }

  updateSpinStats () {
    getSpinStats(this.apiUrl, 1)
      .then((response) => {
        this.spinStats = response.data
        console.log({ response })
      })
      .catch((error) => { console.log(error) })
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
</style>
