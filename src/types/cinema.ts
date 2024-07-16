import { ProvinceCityType } from './ProvinceCity'
import { screen } from './screen'

export type CinemaType = {
  id: number
  name: string
  address: string
  provinceCityId: number
  provinceCity: ProvinceCityType
  status: boolean
  screens: screen[]
}
