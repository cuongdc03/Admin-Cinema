import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import Switch from '@mui/material/Switch';
import { MdDelete, MdEdit } from 'react-icons/md';
import { BsSearch } from 'react-icons/bs';
import { FaArchive } from 'react-icons/fa';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

interface TableProps<T> {
  rows: T[];
  onDelete: (T: T) => void;
  onStatusChange: (T: T) => void; // Hàm xử lý thay đổi trạng thái
  displayedColumns: (keyof T)[]; // Các thuộc tính muốn hiển thị
  isCinema: boolean; // Thêm thuộc tính để xác định đối tượng là Cinema
}

const Table: React.FC<TableProps<any>> = ({
  rows,
  onDelete,
  onStatusChange,
  displayedColumns,
  isCinema,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null); // Add this state to store the selected item
  const theme = createTheme({
    palette: {
      primary: {
        main: '#1976D2', // Define your primary color here
        contrastText: '#fff', // Define the contrast color (usually white for dark colors)
      },
      mode: 'light', // Default to light mode
    },
    components: {
      MuiDataGrid: {
        styleOverrides: {
          columnHeaderTitleContainer: ({ theme }) => ({
            '&.MuiDataGrid-columnHeaderTitleContainer--withBackground': {
              color: theme.palette.primary.contrastText, // Now this will use the defined contrast color
            },
            '&.MuiDataGrid-columnHeaderTitleContainer--withBackground.dark': {
              color: '#ccc', // Light grey color for dark mode
            },
          }),
        },
      },
    },
  });
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredRows = searchQuery
    ? rows.filter((row) => {
        const searchText = searchQuery.toLowerCase();
        return Object.values(row).some((value) =>
          value.toString().toLowerCase().includes(searchText),
        );
      })
    : rows;

  const columns: GridColDef[] = displayedColumns.map((key) => ({
    field: key,
    headerName: key.charAt(0).toUpperCase() + key.slice(1),
    headerClassName: 'bg-gray-200 dark:bg-boxdark dark:text-white',
    cellClassName: 'bg-gray-200 dark:bg-boxdark dark:text-white',
    resizable: false,
    width: displayedColumns.length === 4 ? 250 : 200,
    renderCell: (params) =>
      key === 'status' ? (
        <Switch
          checked={params.row.status === 1}
          onChange={() => handleStatusChange(params.row)}
        />
      ) : (
        params.value
      ),
  }));

  columns.push({
    field: 'actions',
    headerName: 'Actions',
    headerClassName: 'bg-gray-200 dark:bg-boxdark dark:text-white text-center',
    width: 140,
    resizable: false,
    renderCell: (params) => (
      <div className="flex justify-center items-center w-full h-full gap-4">
        <Link
          to={`${params.row.id}`}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex"
        >
          <MdEdit />
        </Link>
        {isCinema ? (
          <button
            onClick={() => handleDelete(params.row)}
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            <FaArchive />
          </button>
        ) : (
          <button
            onClick={() => handleDelete(params.row)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            <MdDelete />
          </button>
        )}
      </div>
    ),
  });

  const handleDelete = async (cinema: any) => {
    setSelectedItem(cinema); // Set the selected item
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (selectedItem) {
        // Make sure an item is selected
        onDelete(selectedItem);
        setSelectedItem(null); // Clear selected item after deleting
      }
      setShowModal(false);
    } catch (error) {
      console.error(`Error deleting cinema:`, error);
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setSelectedItem(null); // Clear selected item on cancel
  };

  const handleStatusChange = async (cinema: any) => {
    try {
      const updatedCinema = { ...cinema, status: cinema.status === 1 ? 0 : 1 };
      await onStatusChange(updatedCinema);
    } catch (error) {
      console.error(`Error changing status:`, error);
    }
  };

  return (
    <div className="flex flex-col ">
      {/* Thanh search và button Create cùng hàng */}
      <div className="flex justify-between items-center mb-4"> {/* Sử dụng justify-between */}
  <div className="relative flex items-center"> 
    <input
      type="text"
      className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
      placeholder="Search..."
      value={searchQuery}
      onChange={handleSearchChange}
    />
    <BsSearch className="absolute right-3 top-2.75" size={20} />
  </div>
  <div className="flex items-center"> {/* Nhóm nút Create và Archive */}
          <Link
            to="create"
            className="relative items-center justify-center rounded-md border border-primary py-2 px-10 text-center font-medium text-primary hover:bg-opacity-90 mr-2" // Thêm margin-right
          >
            Create
          </Link>
          {/* Hiển thị nút Archive nếu isCinema là true */}
          {isCinema && ( 
            <Link
              to="archive" // Hoặc sử dụng onClick để xử lý logic archive
              className="relative items-center justify-center rounded-md border border-yellow-500 py-2 px-10 text-center font-medium text-yellow-500 hover:bg-yellow-100"
            >
              Archive
            </Link>
          )}
        </div>
      </div>
      <ThemeProvider theme={theme}>
        <div style={{ height: 600, width: '100%' }}>
          <DataGrid
            className="rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark"
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
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center ${
          showModal ? 'block' : 'hidden'
        }`}
      >
        <div className="bg-white rounded-lg shadow-lg p-6 w-96">
          <h2 className="text-lg font-bold mb-4">
            {isCinema ? 'Archive Cinema' : 'Delete Item'}
          </h2>
          <p className="text-gray-600 mb-4">
            Are you sure you want to {isCinema ? 'archive' : 'delete'} this{' '}
            {isCinema ? 'cinema' : 'item'}?
          </p>
          <div className="flex justify-between">
            <button
              onClick={handleCancelDelete}
              className="bg-blue-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmDelete}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              {isCinema ? 'Archive' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
