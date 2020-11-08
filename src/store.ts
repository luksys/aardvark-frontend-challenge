import Vue from 'vue'
import Vuex from 'vuex'
import RecordedSpinsModel from '@/models/RecordedSpinsModel'
import ActionsLogModel from '@/models/ActionsLogModel'
import ConfigModel from '@/models/ConfigModel'
import CountdownTimerModel from '@/models/CountdownTimerModel'
import WheelModel from '@/models/WheelModel'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    recordedSpins: Array<RecordedSpinsModel>(),
    actionsLog: Array<ActionsLogModel>(),
    config: {} as ConfigModel,
    countdownTimer: {} as CountdownTimerModel,
    wheel: {} as WheelModel,
    currentSpin: {} as RecordedSpinsModel
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
    },
    updateCountdownTimer (state, countdownTimer: CountdownTimerModel) {
      state.countdownTimer = { ...state.countdownTimer, ...countdownTimer }
    },
    updateWheel (state, wheel) {
      state.wheel = { ...state.wheel, ...wheel }
    },
    updateCurrentSpin (state, spin) {
      state.currentSpin = { ...state.currentSpin, ...spin }
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
    },
    updateCountdownTimerValue (context, value: number) {
      context.commit('updateCountdownTimer', { value })
    },
    updateWheelIsSpinningFlag (context, isSpinning: WheelModel) {
      context.commit('updateWheel', { isSpinning })
    },
    updateCurrentSpin (context, spin: RecordedSpinsModel) {
      context.commit('updateCurrentSpin', spin)
    }
  }
})
