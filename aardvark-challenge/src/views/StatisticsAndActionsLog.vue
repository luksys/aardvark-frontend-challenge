<template>
  <div>
    <ul>
      <li v-for="(position, index) in stats"
          :key="index"></li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({

})
export default class StatisticsAndActionsLog extends Vue {
  public stats = [];
}
</script>
