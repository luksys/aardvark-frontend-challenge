import axios from 'axios'
import axiosRetry from 'axios-retry'
import { NEXT_GAME_PATH, SPIN_BY_UUID_PATH, SPIN_STATS, WHEEL_CONFIG_PATH } from '@/constants'
import store from '@/store'
import { createActionLogEntry } from '@/utilities'

axiosRetry(axios, { retryDelay: axiosRetry.exponentialDelay })

export const getWheelConfig = (apiUrl: string) => {
  store.dispatch('addActionsLogItem', createActionLogEntry('GET ../configuration')).then()
  return axios.get(`${apiUrl}${WHEEL_CONFIG_PATH}`)
}

export const getNextGame = (apiUrl: string) => {
  store.dispatch('addActionsLogItem', createActionLogEntry('GET ../nextGame')).then()
  return axios.get(`${apiUrl}${NEXT_GAME_PATH}`)
}

export const getSpin = (apiUrl: string, uuid: string) => {
  store.dispatch('addActionsLogItem', createActionLogEntry(`GET ../game/${uuid}`)).then()
  return axios.get(`${apiUrl}${SPIN_BY_UUID_PATH}/${uuid}`)
}

export const getSpinStats = (apiUrl: string, limit = 10) => {
  store.dispatch('addActionsLogItem', createActionLogEntry(`GET ../stats/limit=${limit}`)).then()
  return axios.get(`${apiUrl}${SPIN_STATS}?limit=${limit}`)
}
