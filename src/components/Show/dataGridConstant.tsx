import { deleteShow } from '@/apis/show'
import { GridColDef } from '@mui/x-data-grid'
import moment from 'moment'
import { FaTableCells, FaTrash } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

export const formatPrice = (price: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)

export const getDataGridColumns = (
  handleShowMatrix: (showId: number) => void,
  fetchShows: () => void
): GridColDef[] => [
  { field: 'id', headerName: 'ID', width: 100 },
  {
    field: 'filmName',
    headerName: 'Film',
    width: 250,
    renderCell: (params) => (
      <Link to={`/film/${params.row.filmId}`} className='text-blue-500 hover:underline'>
        {params.row.filmName}
      </Link>
    )
  },
  {
    field: 'timeStart',
    headerName: 'Show Time',
    width: 250,
    renderCell: (params) => {
      const startTime = moment(params.row.timeStart, 'HH:mm:ss')

      const endTime = startTime.clone().add(params.row.duration, 'minutes')
      return `${startTime.format('HH:mm')} - ${endTime.format('HH:mm')}`
    }
  },
  {
    field: 'price',
    headerName: 'Price',
    width: 250,
    valueFormatter: (params) => {
      return formatPrice(params)
    }
  },
  {
    field: 'Action',
    headerName: 'Action',
    align: 'center',
    width: 200,
    headerAlign: 'center',
    renderCell: (params) => (
      <div className='flex h-full w-full items-center justify-center gap-4'>
        <button
          onClick={() => handleShowMatrix(params.row.id)}
          className='rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700'
        >
          <FaTableCells />
        </button>
        <button
          onClick={() => handleDeleteShow(params.row.id, fetchShows)}
          className='rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700'
        >
          <FaTrash />
        </button>
      </div>
    )
  }
]

export const DATA_GRID_SETTINGS = {
  pageSize: 5,
  rowsPerPageOptions: [5, 10, 20],
  disableRowSelectionOnClick: true,
  autoHeight: true,
  disableColumnFilter: true,
  disableColumnSelector: true,
  disableColumnResize: true,
  hideFooter: true,
  sx: {
    '& .MuiDataGrid-cell': {
      borderBottom: 'none'
    },
    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: '#f0f0f0',
      borderBottom: 'none'
    },
    '& .MuiDataGrid-footerContainer': {
      display: 'none'
    }
  }
}

export const handleDeleteShow = async (showId: number, fetchShows: () => void) => {
  try {
    await deleteShow(showId)
    toast.success('Show deleted successfully')
    fetchShows() // Fetch lại dữ liệu show sau khi xóa thành công
  } catch (error) {
    toast.error('Failed to delete show')
  }
}
