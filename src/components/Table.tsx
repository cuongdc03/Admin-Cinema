import React, { useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Link } from 'react-router-dom'
import Switch from '@mui/material/Switch'
import { MdDelete, MdEdit } from 'react-icons/md'
import { BsSearch } from 'react-icons/bs'
import { FaArchive } from 'react-icons/fa'
import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from '@mui/material/styles'
import { toast } from 'react-toastify'

interface TableProps<T> {
  rows: T[]
  onDelete: (T: T) => void
  onStatusChange: (T: T) => void
  displayedColumns: (keyof T)[]
  isCinema: boolean
}

const Table: React.FC<TableProps<any>> = ({ rows, onDelete, onStatusChange, displayedColumns, isCinema }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any | null>(null)
  const theme = createTheme({
    palette: {
      primary: {
        main: '#1976D2',
        contrastText: '#fff'
      },
      mode: 'light'
    },
    components: {
      MuiDataGrid: {
        styleOverrides: {
          columnHeaderTitleContainer: ({ theme }) => ({
            '&.MuiDataGrid-columnHeaderTitleContainer--withBackground': {
              color: theme.palette.primary.contrastText
            },
            '&.MuiDataGrid-columnHeaderTitleContainer--withBackground.dark': {
              color: '#ccc'
            }
          })
        }
      }
    }
  })
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const filteredRows = searchQuery
    ? rows.filter((row) => {
        const searchText = searchQuery.toLowerCase()
        return Object.values(row).some((value) => value.toString().toLowerCase().includes(searchText))
      })
    : rows

  const columns: GridColDef[] = displayedColumns.map((key) => ({
    field: key,
    headerName: key.charAt(0).toUpperCase() + key.slice(1),
    headerClassName: 'bg-gray-200 dark:bg-boxdark dark:text-white',
    cellClassName: 'bg-gray-200 dark:bg-boxdark dark:text-white',
    resizable: false,
    width: displayedColumns.length === 4 ? 250 : 200,
    renderCell: (params) =>
      key === 'status' ? (
        <Switch checked={params.row.status === 1} onChange={() => handleStatusChange(params.row)} />
      ) : (
        params.value
      )
  }))

  columns.push({
    field: 'actions',
    headerName: 'Actions',
    headerClassName: 'bg-gray-200 dark:bg-boxdark dark:text-white text-center',
    resizable: false,
    renderCell: (params) => (
      <div className='flex h-full w-full items-center justify-center gap-4'>
        <Link
          to={`${params.row.id}`}
          className='flex rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
        >
          <MdEdit />
        </Link>
        {isCinema ? (
          <button
            onClick={() => handleDelete(params.row)}
            className='mr-2 rounded bg-yellow-500 px-4 py-2 font-bold text-white hover:bg-yellow-700'
          >
            <FaArchive />
          </button>
        ) : (
          <button
            onClick={() => handleDelete(params.row)}
            className='mr-2 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700'
          >
            <MdDelete />
          </button>
        )}
      </div>
    )
  })

  const handleDelete = async (T: any) => {
    setSelectedItem(T)
    setShowModal(true)
  }

  const handleConfirmDelete = async () => {
    try {
      if (selectedItem) {
        onDelete(selectedItem)
        setSelectedItem(null)
      }
      setShowModal(false)
    } catch (error) {
      toast.error('Delete failed')
    }
  }

  const handleCancelDelete = () => {
    setShowModal(false)
    setSelectedItem(null)
  }

  const handleStatusChange = async (T: any) => {
    try {
      const updatedOjbect = { ...T, status: T.status === 1 ? 0 : 1 }
      await onStatusChange(updatedOjbect)
    } catch (error) {}
  }

  return (
    <div className='flex flex-col '>
      <div className='mb-4 flex items-center justify-between'>
        {' '}
        <div className='relative flex items-center'>
          <input
            type='text'
            className='border-gray-300 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Search...'
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <BsSearch className='top-2.75 absolute right-3' size={20} />
        </div>
        <div className='flex items-center'>
          {' '}
          <Link
            to='create'
            className='relative mr-2 items-center justify-center rounded-md border border-primary px-10 py-2 text-center font-medium text-primary hover:bg-opacity-90' // Thêm margin-right
          >
            Create
          </Link>
          {isCinema && (
            <Link
              to='archive'
              className='relative items-center justify-center rounded-md border border-yellow-500 px-10 py-2 text-center font-medium text-yellow-500 hover:bg-yellow-100'
            >
              Archive
            </Link>
          )}
        </div>
      </div>
      <ThemeProvider theme={theme}>
        <div style={{ height: 600, width: '100%' }}>
          <DataGrid
            className='rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark'
            rows={filteredRows}
            columns={columns}
            pageSizeOptions={[5, 10, 20]}
            disableRowSelectionOnClick
            autoHeight
            disableColumnFilter
            disableColumnSelector
          />
        </div>
      </ThemeProvider>
      <div className={`fixed inset-0 z-50 flex items-center justify-center ${showModal ? 'block' : 'hidden'}`}>
        <div className='w-96 rounded-lg bg-white p-6 shadow-lg'>
          <h2 className='mb-4 text-lg font-bold'>{isCinema ? 'Archive Cinema' : 'Delete Item'}</h2>
          <p className='text-gray-600 mb-4'>
            Are you sure you want to {isCinema ? 'archive' : 'delete'} this {isCinema ? 'cinema' : 'item'}?
          </p>
          <div className='flex justify-between'>
            <button
              onClick={handleCancelDelete}
              className='hover:bg-gray-500 rounded bg-blue-400 px-4 py-2 font-bold text-white'
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmDelete}
              className='rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700'
            >
              {isCinema ? 'Archive' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table
