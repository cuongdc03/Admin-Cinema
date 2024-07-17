import { ScreenType } from '../types/screen'
import { customFetch, showError } from '../util/http'
import { ADMIN_SCREEN_URL } from './constant'

export const getScreenByCinemaId = async (cinemaId: number): Promise<ScreenType[]> => {
  return await customFetch.get(`${ADMIN_SCREEN_URL}/${cinemaId}`, { signalKey: 'getScreenByCinemaId' }).catch(showError)
}
