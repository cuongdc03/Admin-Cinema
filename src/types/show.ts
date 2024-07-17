import { FilmType } from './film'

export type ShowType = {
  id: number
  screenId: number
  timeStart: string
  dateStart: string
  price: number
  seatMatrix: string
  film: FilmType
  status: string
}
