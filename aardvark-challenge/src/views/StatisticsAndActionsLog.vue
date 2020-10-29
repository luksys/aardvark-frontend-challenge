<template>
  <div>
    <div>
      <h2>Statistics</h2>
      <table class="table-stats">
        <thead>
        <tr>
          <th>Color</th>
          <th>Result</th>
          <th>Number of Occurrence(s)</th>
          <th>Hot / Cold / Neutral</th>
        </tr>
        </thead>
        <tbody>
          <tr
            v-for="(itemStats, index) in stats"
            :key="index"
          >
            <td>
              <div
                :class="['background-color-' + Colors[Results.findIndex((result) => +result === itemStats.result)]]"
                style="height: 40px; width: 80px;"
              ></div>
            </td>
            <td>{{ itemStats.result }}</td>
            <td>{{ itemStats.count }}</td>
            <td>{{ test(index, stats) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <h2>Actions Log</h2>
      <table>
        <thead>
        <tr>
          <th>Timestamp</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
          <tr
            v-for="(actionLogEntry, index) in ActionsLog"
            :key="index"
          >
            <td>{{ actionLogEntry.timestamp }}</td>
            <td>{{ actionLogEntry.action }}</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import ActionsLogModel from '@/models/ActionsLogModel'
import { getSpinStats } from '@/services'

@Component({

})
export default class StatisticsAndActionsLog extends Vue {
  @Prop() apiUrl!: string;
  private stats = [];

  get Colors () {
    return this.$store.state.config.colors
  }

  get Results () {
    return this.$store.state.config.results
  }

  get ActionsLog (): ActionsLogModel[] {
    return this.$store.state.actionsLog
  }

  mounted () {
    this.setSpinStats()
  }

  setSpinStats () {
    getSpinStats(this.apiUrl, 200).then(response => {
      this.stats = [...response.data]
    })
  }

  test (index, stats) {
    // if (index < 5) {return 'Cold!'}
    // if (index)
    // console.log({ index, stats })
    return 'TESTSDAASD'
  }
}
</script>
<style lang="scss">
  //.table-stats {
  //  tbody tr {
  //    border-bottom-style: solid;;
  //    border-bottom-width: 4px;
  //  }
  //}
</style>
