import { CinemaType } from '../types/cinema'
import { customFetch, showError } from '../util/http'
import { ADMIN_CINEMA_URL } from './constant'

export const getCinemas = async (): Promise<CinemaType[]> => {
  return await customFetch.get(ADMIN_CINEMA_URL, { signalKey: 'getCinemas' }).catch(showError)
}
