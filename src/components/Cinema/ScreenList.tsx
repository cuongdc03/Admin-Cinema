import React, { useCallback, useEffect, useRef, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { MdDelete, MdEdit } from 'react-icons/md'
import { screen } from '../../types/screen'

interface ScreenListProps {
  cinemaId: number
  screenList: screen[]
  onEdit: (screen: any) => void
}

const ScreenList: React.FC<ScreenListProps> = ({ cinemaId, screenList, onEdit }) => {
  const [screens, setScreens] = useState<any[]>(screenList)
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedScreen, setSelectedScreen] = useState<any | null>(null)
  const [modalKey, setModalKey] = useState(0)

  const countSeats = useCallback((screen: any) => {
    if (screen.seatMatrix) {
      const parsedSeatMatrix = JSON.parse(screen.seatMatrix)
      return parsedSeatMatrix.data.reduce((acc, row) => {
        return acc + row.rowSeats.filter((seat) => seat.isSeat).length
      }, 0)
    }
    return 0
  }, [])

  useEffect(() => {
    setScreens(
      screenList.map((screen: any) => ({
        ...screen,
        totalSeats: countSeats(screen)
      }))
    )
  }, [screenList, countSeats])

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 300, resizable: false },
    { field: 'name', headerName: 'Screen Name', width: 300, resizable: false },
    {
      field: 'totalSeats',
      headerName: 'Total Seats',
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
      width: 200,
      headerClassName: 'ml-auto',
      renderCell: (params) => (
        <div className='flex h-full items-center justify-center gap-4'>
          <button className='flex rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700'>
            <MdEdit />
          </button>
          <button className='mr-2 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700'>
            <MdDelete />
          </button>
        </div>
      )
    }
  ]

  return (
    <div style={{ height: 400, width: '100%' }}>
      {loading ? (
        <div>Loading screens...</div>
      ) : (
        <>
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
