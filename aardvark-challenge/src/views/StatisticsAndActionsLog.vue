<template>
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
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({

})
export default class StatisticsAndActionsLog extends Vue {
  @Prop() stats: [];
}
</script>
