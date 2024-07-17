import { GridColDef } from '@mui/x-data-grid'
import moment from 'moment'
import { FaTableCells } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

export const formatPrice = (price: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)

export const DATA_GRID_COLUMNS: GridColDef[] = [
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
    field: 'seatMatrix',
    headerName: 'Seat Matrix',
    align: 'center',
    width: 150,
    headerAlign: 'center',
    renderCell: (params) => (
      <button
        onClick={() => handleShowMatrix(params.row.id)}
        className='mr-2 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700'
      >
        <FaTableCells />
      </button>
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

export const handleShowMatrix = (showId: number) => {
  // TODO: Show SeatMatrix
}
