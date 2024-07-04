import { pronvinceCity } from "./provinceCity"

export type cinema = {
  id: number
  name: string
  address: string
  provinceCity: pronvinceCity
  status: boolean
  screenList: string
}
