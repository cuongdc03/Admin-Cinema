import { customFetch, showError } from '../util/http'
import { SCREEN_ADMIN_URL } from './constant'
import { ScreenBodyType } from '../types/screen'

export const createScreen = async (data: ScreenBodyType) => {
  return await customFetch.post(SCREEN_ADMIN_URL, { body: data, signalKey: 'createScreen' }).catch(showError)
}
