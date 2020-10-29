import Vue from 'vue'
import Vuex from 'vuex'
import RecordedSpinsModel from '@/models/RecordedSpinsModel'
import ActionsLogModel from '@/models/ActionsLogModel'
import ConfigModel from '@/models/ConfigModel'
import NotificationBarMessage from '@/models/NotificationBarMessage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    recordedSpins: Array<RecordedSpinsModel>(),
    actionsLog: Array<ActionsLogModel>(),
    config: {} as ConfigModel,
    notificationBarMessage: {} as NotificationBarMessage
  },
  mutations: {
    addRecordedSpin (state, recordedSpinsModel: RecordedSpinsModel) {
      state.recordedSpins.push(recordedSpinsModel)
    },
    addActionsLogItem (state, actionsLogModel: ActionsLogModel) {
      state.actionsLog.push(actionsLogModel)
    },
    addConfig (state, configModel: ConfigModel) {
      state.config = configModel
    }
  },
  actions: {
    addRecordedSpin (context, recordedSpinsModel: RecordedSpinsModel) {
      context.commit('addRecordedSpin', recordedSpinsModel)
    },
    addActionsLogItem (context, actionsLogModel: ActionsLogModel) {
      context.commit('addActionsLogItem', actionsLogModel)
    },
    addConfig (context, configModel: ConfigModel) {
      context.commit('addConfig', configModel)
    }
  }
})
