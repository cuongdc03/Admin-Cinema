import { ShowType } from './show'

export type ScreenType = {
  id: number
  name: string
  seats: number
  status: string
  seatMatrix: string
  shows: ShowType[]
}
