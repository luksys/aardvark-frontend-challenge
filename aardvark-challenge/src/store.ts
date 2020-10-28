import Vue from 'vue'
import Vuex from 'vuex'
import RecordedSpinsModel from '@/models/RecordedSpinsModel'
import ActionsLogModel from '@/models/ActionsLogModel'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    recordedSpins: Array<RecordedSpinsModel>(),
    actionsLog: Array<ActionsLogModel>()
  },
  mutations: {
    addRecordedSpin (state, recordedSpinsModel: RecordedSpinsModel) {
      state.recordedSpins.push(recordedSpinsModel)
    },
    addActionsLogItem (state, actionsLogModel: ActionsLogModel) {
      state.actionsLog.push(actionsLogModel)
    }
  },
  actions: {
    addRecordedSpin (context, recordedSpinsModel: RecordedSpinsModel) {
      context.commit('addRecordedSpin', recordedSpinsModel)
    },
    addActionsLogItem (context, actionsLogModel: ActionsLogModel) {
      context.commit('addActionsLogItem', actionsLogModel)
    }
  }
})
