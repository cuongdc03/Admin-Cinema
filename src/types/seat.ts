export type seat = {
  name: string
  isSeat: boolean
  isSold: boolean
  onHold: string
  colId: number
  seatId: number
  price: number
}

export type SeatRow = {
  rowName: string
  rowSeats: seat[]
}
