import axios from 'axios'
import { NEXT_GAME_PATH, SPIN_BY_UUID_PATH, SPIN_STATS, WHEEL_CONFIG_PATH } from '@/constants'

export const getWheelConfig = (apiUrl: string) => {
  return axios.get(`${apiUrl}${WHEEL_CONFIG_PATH}`)
}

export const getNextGame = (apiUrl: string) => {
  return axios.get(`${apiUrl}${NEXT_GAME_PATH}`)
}

export const getSpin = (apiUrl: string, uuid: string) => {
  return axios.get(`${apiUrl}${SPIN_BY_UUID_PATH}/${uuid}`)
}

export const getSpinStats = (apiUrl: string, limit: number) => {
  return axios.get(`${apiUrl}${SPIN_STATS}?limit=${limit}`)
}
