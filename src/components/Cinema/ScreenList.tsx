import React, { useCallback, useEffect, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { MdDelete, MdEdit } from 'react-icons/md'
import { ScreenType } from '@/types/screen'
import { useNavigate } from 'react-router-dom'
import { path } from '@/router/path'
import { deleteScreen } from '@/apis/screen'
import { DELETE_SCREEN_FAILED, DELETE_SCREEN_SUCCESS, SUCCESS_STATUS } from '@/components/Cinema/constants'
import { toast } from 'react-toastify'
import ModalConfirm from '@/components/ModalConfirm/ModalConfirm'

interface ScreenListProps {
  cinemaId: number
  screens: ScreenType[]
}

const ScreenList: React.FC<ScreenListProps> = ({ cinemaId, screens: initialScreens }) => {
  const [screens, setScreens] = useState<ScreenType[]>(initialScreens)
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [selectedScreen, setSelectedScreen] = useState<ScreenType>()

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

  const handleUpdateScreen = (id: string) => {
    navigate(path.updateScreen.replace(':id', id))
  }

  const handleDeleteScreen = async (id: number) => {
    const response = await deleteScreen(id)
    if (response.status === SUCCESS_STATUS) {
      toast.success(DELETE_SCREEN_SUCCESS)
      setLoading(true)
      const updatedScreens = screens.filter((screen) => screen.id !== id)
      setScreens(updatedScreens)
      setLoading(false)
    } else {
      toast.error(DELETE_SCREEN_FAILED)
    }
  }

  const handleSelectedScreenForRemoving = (screen: ScreenType) => {
    setSelectedScreen(screen)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

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
            onClick={() => handleUpdateScreen(params.row.id)}
            className='flex rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700'
          >
            <MdEdit />
          </button>
          <button
            className='mr-2 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700'
            onClick={() => handleSelectedScreenForRemoving(params.row)}
          >
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
          <ModalConfirm
            heading='Delete this screen'
            desc='Are you sure you want to delete this screen?'
            showModal={showModal}
            confirmBtnTitle='Delete'
            onCancel={handleCloseModal}
            onConfirm={() => handleDeleteScreen(selectedScreen?.id as number)}
          />
        </>
      )}
    </div>
  )
}

export default ScreenList