import { ProvinceCityType } from './provinceCity'

export type CinemaType = {
  id: number
  name: string
  address: string
  provinceCityId: number
  provinceCity: ProvinceCityType
  status: boolean
  screenList: string
}
