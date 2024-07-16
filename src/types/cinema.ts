import { ProvinceCityType } from './provinceCity'

export type CinemaType = {
  id: number
  name: string
  address: string
  provinceCity: ProvinceCityType
  status: boolean
  screenList: string
}
