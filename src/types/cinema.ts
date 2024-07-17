import { ScreenType } from './screen'

export type CinemaType = {
  id: number
  name: string
  address: string
  provinceCity: string
  provinceCityId: number
  status: boolean
  screens: ScreenType[]
}
