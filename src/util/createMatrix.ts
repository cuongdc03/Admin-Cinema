import { seat, SeatRow } from '../types/seat'

const numberToLetter = (num: number) => {
  return String.fromCharCode(65 + num)
}

export const createSeatMatrix = (rows: number, cols: number) => {
  const seatMatrix: SeatRow[] = []
  for (let rowNum = 0; rowNum < rows; rowNum++) {
    const rowName = numberToLetter(rowNum)
    const rowSeats: seat[] = []
    for (let colNum = 0; colNum < cols; colNum++) {
      rowSeats.push({
        price: 0,
        isSeat: false,
        name: '',
        isSold: false,
        onHold: false,
        colId: colNum,
        seatId: 0
      })
    }
    seatMatrix.push({ rowName, rowSeats })
  }
  return seatMatrix
}

export const adjustSeatNameToMatrix = (seatMatrix: SeatRow[]): SeatRow[] => {
  return seatMatrix.map((row) => {
    let seatCounter = 1
    row.rowSeats = row.rowSeats.map((seat) => {
      if (seat.isSeat) {
        seat.name = `${row.rowName}${seatCounter}`
        seatCounter++
      }
      return seat
    })
    return row
  })
}

export const changeStatusOfSeat = (seatMatrix: SeatRow[], rowName: string, colId: number): SeatRow[] => {
  const newSeatMatrix = seatMatrix.map((row) => {
    if (row.rowName === rowName) {
      row.rowSeats = row.rowSeats.map((seat) => {
        if (seat.colId === colId) {
          seat.isSeat = !seat.isSeat
          seat.name = ''
        }
        return seat
      })
    }
    return row
  })

  return adjustSeatNameToMatrix(newSeatMatrix)
}
