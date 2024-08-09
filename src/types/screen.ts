export type ScreenType = {
  id: number
  name: string
  cinemaId: number
  size: string
  seatMatrix: string
}

export type ScreenBodyType = {
  cinemaId: number
  name: string
  size: string
  seatMatrix: string
  status: boolean
}
