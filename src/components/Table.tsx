import React, { useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Link } from 'react-router-dom'
import Switch from '@mui/material/Switch'
import { MdDelete, MdEdit } from 'react-icons/md'
import { BsSearch } from 'react-icons/bs'
import { FaArchive } from 'react-icons/fa'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { COLUMN_WIDTHS, PAGE_SIZE_OPTIONS, THEME } from '@/components/constant'

interface TableProps<T> {
  rows: T[]
  onDelete: (item: T) => void
  onStatusChange: (item: T) => void
  displayedColumns: (keyof T)[]
  isCinema: boolean
}

const Table = <T extends { id: number; status?: boolean; [key: string]: any }>({
  rows,
  onDelete,
  onStatusChange,
  displayedColumns,
  isCinema
}: TableProps<T>) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<T | null>(null)

  const theme = createTheme(THEME)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const filteredRows = searchQuery
    ? rows.filter((row) => {
        const searchText = searchQuery.toLowerCase()
        return Object.values(row).some((value) => value.toString().toLowerCase().includes(searchText))
      })
    : rows

  const handleArchiveClick = (item: T) => {
    setSelectedItem(item)
    setShowModal(true)
  }

  const handleStatusChange = async (item: T) => {
    try {
      const updatedObject = { ...item, status: !item.status }
      await onStatusChange(updatedObject)
    } catch (error) {}
  }

  const handleDelete = async (item: T) => {
    setSelectedItem(item)
    setShowModal(true)
  }

  const handleConfirmDelete = async () => {
    try {
      if (selectedItem) {
        await onDelete(selectedItem)
        setSelectedItem(null)
      }
      setShowModal(false)
    } catch (error) {}
  }

  const handleConfirmArchive = async () => {
    try {
      if (selectedItem) {
        await handleStatusChange(selectedItem)
        setSelectedItem(null)
      }
      setShowModal(false)
    } catch (error) {}
  }

  const handleCancelDelete = () => {
    setShowModal(false)
    setSelectedItem(null)
  }

  const columns: GridColDef[] = displayedColumns.map((key) => ({
    field: key as string,
    headerName: key.toString().charAt(0).toUpperCase() + key.toString().slice(1),
    headerClassName: 'bg-gray-200 dark:bg-boxdark dark:text-white',
    cellClassName: 'bg-gray-200 dark:bg-boxdark dark:text-white',
    resizable: false,
    width: displayedColumns.length === 4 ? COLUMN_WIDTHS.expanded : COLUMN_WIDTHS.default,
    renderCell: (params) => {
      if (key === 'status') {
        return (
          <Switch checked={params.row.status as boolean} onChange={() => handleStatusChange(params.row)} disabled />
        )
      } else if (key === 'provinceCityName') {
        return (params.row as any).provinceCity?.name
      }
      return params.value
    }
  }))

  columns.push({
    field: 'actions',
    headerName: 'Actions',
    headerClassName: 'bg-gray-200 dark:bg-boxdark dark:text-white text-center',
    width: COLUMN_WIDTHS.actions,
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
            onClick={() => handleArchiveClick(params.row)}
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

  return (
    <div className='flex flex-col'>
      <div className='mb-4 flex items-center justify-between'>
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
          <Link
            to='create'
            className='relative mr-2 items-center justify-center rounded-md border border-primary px-10 py-2 text-center font-medium text-primary hover:bg-opacity-90'
          >
            Create
          </Link>
        </div>
      </div>
      <ThemeProvider theme={theme}>
        <div className='h-150 w-full'>
          <DataGrid
            className='rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark'
            rows={filteredRows}
            columns={columns}
            pageSizeOptions={PAGE_SIZE_OPTIONS}
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
              onClick={isCinema ? handleConfirmArchive : handleConfirmDelete}
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
