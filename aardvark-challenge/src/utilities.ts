import ActionsLogModel from '@/models/ActionsLogModel'

export const createActionLogEntry = (action: string): ActionsLogModel => {
  const timestamp = new Date().toString()
  return { action, timestamp }
}
