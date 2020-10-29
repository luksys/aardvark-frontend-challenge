<template>
  <div>
    <section class="col mb-9">
      <h2>Statistics</h2>
      <ul class="d-flex mb-2">
        <li class="mr-2"><span class="pill background-color-blue">Cold!</span> - Least Occurrences</li>
        <li class="mr-2"><span class="pill">Hot!</span> - Most Occurrences</li>
        <li><span class="pill background-color-yellow">Neutral</span> - Occurrences</li>
      </ul>
      <table class="table-stats">
        <thead>
        <tr>
          <th>Color</th>
          <th>Result</th>
          <th>Number of Occurrence(s)</th>
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
            <td>
              {{ itemStats.count }}
              <span class="position-relative">
                <span
                  class="pill"
                  :class="[getOccurrenceIndicatorColorClass(index, stats)]"
                >{{ getOccurrenceIndicator(index, stats) }}</span>
              </span>
            </td>
          </tr>
          <tr v-if="!stats.length">
            <td colspan="3" class="text-center">No Records Found</td>
          </tr>
        </tbody>
      </table>
    </section>
    <section class="col">
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
          <tr v-if="!ActionsLog.length">
            <td colspan="2" class="text-center">No Records Found</td>
          </tr>
        </tbody>
      </table>
    </section>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import ActionsLogModel from '@/models/ActionsLogModel'
import { getSpinStats } from '@/services'
import { createActionLogEntry } from '@/utilities'

@Component
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
    this.$store.dispatch('addActionsLogItem', createActionLogEntry('StatisticsAndActionsLog mounted')).then()
    this.setSpinStats()
  }

  setSpinStats () {
    getSpinStats(this.apiUrl, 200)
      .then(response => {
        this.stats = [...response.data]
      })
      .catch(error => console.log({ error }))
  }

  getOccurrenceIndicator (index, stats): string {
    if (!stats) return

    if (index < 5) { return 'Cold!' }
    if ((stats.length - 1) - index <= 4) { return 'Hot!' }
    return 'Neutral'
  }

  getOccurrenceIndicatorColorClass (index, stats): string {
    if (!stats) return

    if (index < 5) { return 'background-color-blue' }
    if ((stats.length - 1) - index <= 4) return
    return 'background-color-yellow'
  }
}
</script>
<style lang="scss">
  .table-stats {
    .pill {
      position: absolute;
      left: 4px;
      top: -7px;
    }
  }
</style>
