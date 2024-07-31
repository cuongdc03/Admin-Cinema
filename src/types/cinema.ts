import { ProvinceCityType } from './provincecity'
import { ScreenType } from './screen'

export type CinemaType = {
  id: number
  name: string
  address: string
  provinceCityId: number
  provinceCity: ProvinceCityType
  status: boolean
  screens: ScreenType[]
}
