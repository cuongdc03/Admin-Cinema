import { customFetch, showError } from '../util/http'
import { SCREEN_ADMIN_URL, SCREEN_URL } from './constant'
import { ScreenBodyType, ScreenType } from '../types/screen'

export const createScreen = async (data: ScreenBodyType) => {
  return await customFetch.post(SCREEN_ADMIN_URL, { body: data, signalKey: 'createScreen' }).catch(showError)
}

export const getScreenById = async (id: number) => {
  return await customFetch.get(SCREEN_URL, {
    query: { id }
  })
}

export const updateScreen = async (screen: ScreenType) => {
  return await customFetch.put(SCREEN_ADMIN_URL, {
    body: screen
  })
}

export const deleteScreen = async (id: number) => {
  return await customFetch.delete(`${SCREEN_ADMIN_URL}/${id}`)
}
