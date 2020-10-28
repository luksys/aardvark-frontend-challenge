import Vue from 'vue'
import Vuex from 'vuex'
import RecordedSpinsModel from '@/models/RecordedSpinsModel'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    recordedSpins: Array<RecordedSpinsModel>()
  },
  mutations: {
    addRecordedSpin (state, recordedSpinsModel: RecordedSpinsModel) {
      state.recordedSpins.push(recordedSpinsModel)
    }
  },
  actions: {
    addRecordedSpin (context, recordedSpinsModel: RecordedSpinsModel) {
      context.commit('addRecordedSpin', recordedSpinsModel)
    }
  }
})
