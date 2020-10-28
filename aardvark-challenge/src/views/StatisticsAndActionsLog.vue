<template>
  <div>
    <div>
      <h2>Statistics</h2>
      <table>
        <thead>
        <tr>
          <th>Spin</th>
          <th>Result</th>
          <th>Count</th>
        </tr>
        </thead>
        <tbody>
          <tr
            v-for="(itemStats, index) in stats"
            :key="index"
          >
            <td>{{ index }}</td>
            <td>{{ itemStats.result }}</td>
            <td>{{ itemStats.count }}</td>
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

@Component({

})
export default class StatisticsAndActionsLog extends Vue {
  @Prop() stats: [];

  get ActionsLog (): ActionsLogModel[] {
    return this.$store.state.actionsLog
  }
}
</script>
