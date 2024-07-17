import { ProvinceCityType } from '../types/ProvinceCity'
import { customFetch, showError } from '../util/http'
import { PROVINCE_CITY_URL } from './constant'

export const getprovinceCities = async (): Promise<ProvinceCityType[]> => {
  return await customFetch.get(PROVINCE_CITY_URL, { signalKey: 'getprovinceCities' }).catch(showError)
}
