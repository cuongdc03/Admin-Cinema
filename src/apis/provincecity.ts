import { provincecity } from '../types/provincecity'
import { customFetch, showError } from '../util/http'
import { PROVINCE_CITY_URL } from './constant'

export const getprovinceCities = async (): Promise<provincecity[]> => {
  return await customFetch.get(PROVINCE_CITY_URL, { signalKey: 'getprovinceCities' }).catch(showError)
}
