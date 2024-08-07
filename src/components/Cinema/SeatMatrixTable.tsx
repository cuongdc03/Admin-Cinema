import React, { useRef, useEffect, useState } from 'react'
import ImgScreen from '@/assets/img-screen.png'
import Seat from './Seat'
import IconEditAll from '@/assets/ic-edit-all.svg?react'
import IconHideAll from '@/assets/ic-hide-all.svg?react'
import SeatLegendItem from './SeatLegendItem'
import { adjustSeatNameToMatrix, changeStatusOfSeat } from '@/util/createMatrix'
import { SeatRow } from '@/types/seat'

interface SeatMatrixTableProps {
  seatMatrix: SeatRow[]
  setSeatMatrix: React.Dispatch<React.SetStateAction<SeatRow[]>>
}

const SeatMatrixTable: React.FC<SeatMatrixTableProps> = ({ seatMatrix, setSeatMatrix }) => {
  const tableRef = useRef<HTMLTableElement | null>(null)
  const [tableWidth, setTableWidth] = useState('auto')

  const chooseRow = (rowName: string, isSeat: boolean) => {
    const newSeatMatrix = seatMatrix.map((row) => {
      if (row.rowName === rowName) {
        const newRowSeats = row.rowSeats.map((seat) => ({ ...seat, isSeat, name: isSeat ? seat.name : '' }))
        return {
          ...row,
          rowSeats: newRowSeats
        }
      } else {
        return row
      }
    })
    setSeatMatrix(adjustSeatNameToMatrix(newSeatMatrix))
  }

  const chooseCol = (colId: number, isSeat: boolean) => {
    const newSeatMatrix = seatMatrix.map((row) => {
      return {
        ...row,
        rowSeats: row.rowSeats.map((seat) =>
          seat.colId === colId ? { ...seat, isSeat, name: isSeat ? seat.name : '' } : seat
        )
      }
    })
    setSeatMatrix(adjustSeatNameToMatrix(newSeatMatrix))
  }

  const toggleSeatStatus = (seatMatrix: SeatRow[], rowName: string, colId: number) => {
    setSeatMatrix(changeStatusOfSeat(seatMatrix, rowName, colId))
  }

  useEffect(() => {
    if (tableRef.current) {
      setTableWidth(tableRef.current.offsetWidth + 'px')
    }
  }, [seatMatrix])

  return (
    <div className='mt-2 overflow-auto rounded-lg bg-dark-blue-900 px-10 pb-4 pt-1'>
      <div className='relative mx-auto mt-10 flex justify-center' style={{ width: tableWidth }}>
        <img src={ImgScreen} alt='screen' />
        <h4 className='absolute left-1/2 top-[6px] -translate-x-1/2 text-xl font-bold tracking-wider'>Screen</h4>
      </div>

      <table ref={tableRef} className='mx-auto mt-3'>
        <tbody>
          {seatMatrix.length > 0 &&
            seatMatrix.map((seatRow, rowIndex) => (
              <tr key={seatRow.rowName}>
                <td key={seatRow.rowName} className='px-1 py-[3px]'>
                  <div className='flex min-h-[30px] w-full min-w-[40px] items-center justify-center text-lg font-bold'>
                    {seatRow.rowName}
                  </div>
                </td>
                {seatRow.rowSeats.map((seat) => {
                  return (
                    <td key={`${seat.colId}-${seat.seatId}`} className='px-1 py-[3px]' colSpan={1}>
                      <Seat
                        seat={seat}
                        toggleSeatStatus={() => toggleSeatStatus(seatMatrix, seatRow.rowName, seat.colId)}
                      />
                    </td>
                  )
                })}
                <td key={`${seatRow.rowName}-${rowIndex}-edit-btn`} className='px-1 py-[3px]'>
                  <div
                    className='flex h-[30px] w-[40px] items-center justify-center rounded-md bg-stone-700 hover:cursor-pointer hover:bg-stone-800'
                    onClick={() => chooseRow(seatRow.rowName, true)}
                  >
                    <IconEditAll />
                  </div>
                </td>
                <td key={`${seatRow.rowName}-${rowIndex}-hide-btn`} className='px-1 py-[3px]'>
                  <div
                    className='flex h-[30px] w-[40px] items-center justify-center rounded-md bg-red-800 hover:cursor-pointer hover:bg-red-900'
                    onClick={() => chooseRow(seatRow.rowName, false)}
                  >
                    <IconHideAll />
                  </div>
                </td>
              </tr>
            ))}
          {seatMatrix.length > 0 && (
            <tr key='select-all'>
              <td className='px-1 py-[3px]'>
                <div className='flex min-h-[30px] w-full min-w-[40px] items-center justify-center text-lg font-bold'></div>
              </td>
              {Array.from({ length: seatMatrix[0].rowSeats.length }, (_, index) => index).map((colId: number) => (
                <td key={`${colId}-btn`} className='px-1 py-[3px]'>
                  <div
                    className='flex h-[30px] w-[40px] items-center justify-center rounded-md bg-stone-700 hover:cursor-pointer hover:bg-stone-800'
                    onClick={() => chooseCol(colId, true)}
                  >
                    <IconEditAll />
                  </div>
                </td>
              ))}
            </tr>
          )}
          {seatMatrix.length > 0 && (
            <tr key='delete-all'>
              <td className='px-1 py-[3px]'>
                <div className='flex min-h-[30px] w-full min-w-[40px] items-center justify-center text-lg font-bold'></div>
              </td>
              {Array.from({ length: seatMatrix[0].rowSeats.length }, (_, index) => index).map((colId: number) => (
                <td key={`${colId}-btn`} className='px-1 py-[3px]'>
                  <div
                    className='flex h-[30px] w-[40px] items-center justify-center rounded-md bg-red-800 hover:cursor-pointer hover:bg-red-900'
                    onClick={() => chooseCol(colId, false)}
                  >
                    <IconHideAll />
                  </div>
                </td>
              ))}
            </tr>
          )}
        </tbody>
      </table>

      <div className='mt-10 flex w-full items-center justify-center gap-8'>
        <SeatLegendItem className='h-[30px] w-[40px]' label='Regular Seat' />
        <SeatLegendItem className='h-[30px] w-[40px] opacity-[0.05]' label='No Seat' />
      </div>
    </div>
  )
}

export default SeatMatrixTable
