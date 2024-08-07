import React, { useCallback, useEffect, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { MdDelete, MdEdit } from 'react-icons/md'
import { ScreenType } from '@/types/screen'
import { useNavigate } from 'react-router-dom'
import { path } from '@/router/path'

interface ScreenListProps {
  cinemaId: number
  screens: ScreenType[]
}

const ScreenList: React.FC<ScreenListProps> = ({ cinemaId, screens: initialScreens }) => {
  const [screens, setScreens] = useState<ScreenType[]>(initialScreens)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const countSeats = useCallback((screen: ScreenType) => {
    if (screen.seatMatrix) {
      const parsedSeatMatrix = JSON.parse(screen.seatMatrix)
      return parsedSeatMatrix.data.reduce((acc: number, row: any) => {
        return acc + row.rowSeats.filter((seat: any) => seat.isSeat).length
      }, 0)
    }
    return 0
  }, [])

  useEffect(() => {
    setScreens(
      initialScreens.map((screen: ScreenType) => ({
        ...screen,
        totalSeats: countSeats(screen)
      }))
    )
  }, [initialScreens, countSeats])

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 300, resizable: false },
    { field: 'name', headerName: 'Screen Name', width: 300, resizable: false },
    { field: 'size', headerName: 'Size', width: 150, align: 'center', headerAlign: 'center', resizable: false },
    {
      field: 'totalSeats',
      headerName: 'Total Seats',
      align: 'center',
      headerAlign: 'center',
      width: 200,
      resizable: false,
      renderCell: (params) => {
        const screen = params.row
        return screen.totalSeats || 0
      }
    },
    {
      field: 'actions',
      headerName: 'Actions',
      resizable: false,
      headerAlign: 'center',
      align: 'center',
      width: 150,
      headerClassName: 'ml-auto',
      renderCell: (params) => (
        <div className='flex h-full items-center justify-center gap-4'>
          <button
            onClick={() => {
              navigate(path.updateScreen.replace(':id', params.row.id))
            }}
            className='flex rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700'
          >
            <MdEdit />
          </button>
          <button className='mr-2 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700'>
            <MdDelete />
          </button>
        </div>
      )
    }
  ]

  const navigateToAddScreenPage = () => {
    navigate(path.createScreen.replace(':id', cinemaId.toString()))
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      {loading ? (
        <div>Loading screens...</div>
      ) : (
        <>
          <div className='mb-2 flex items-center justify-end'>
            <button
              className='hover:bg-primary-dark text-md mt-4 rounded-lg bg-primary px-4 py-2 font-medium text-white shadow-md focus:outline-none focus:ring-2 focus:ring-primary'
              onClick={navigateToAddScreenPage}
            >
              Add New Screen
            </button>
          </div>
          <DataGrid
            className='rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark'
            rows={screens}
            columns={columns}
            pageSizeOptions={[5, 10, 20]}
            disableRowSelectionOnClick
            autoHeight
            disableColumnFilter
            disableColumnSelector
          />
        </>
      )}
    </div>
  )
}

export default ScreenList
