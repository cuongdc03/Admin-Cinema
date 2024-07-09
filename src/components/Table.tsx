import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import Switch from '@mui/material/Switch';
import { MdDelete, MdEdit } from 'react-icons/md';
import { BsSearch } from 'react-icons/bs';


interface TableTestProps<T> {
  rows: T[];
  onDelete: (T: T) => void; 
  onStatusChange: (T: T) => void; // Hàm xử lý thay đổi trạng thái
  displayedColumns: (keyof T)[]; // Các thuộc tính muốn hiển thị
}

const TableTest: React.FC<TableTestProps<any>> = ({ rows, onDelete, onStatusChange, displayedColumns }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredRows = searchQuery
    ? rows.filter((row) => {
        const searchText = searchQuery.toLowerCase();
        return Object.values(row).some((value) =>
          value.toString().toLowerCase().includes(searchText)
        );
      })
    : rows;

  const columns: GridColDef[] = displayedColumns.map((key) => ({
    field: key,
    headerName: key.charAt(0).toUpperCase() + key.slice(1),
    headerClassName: 'bg-gray-200 dark:bg-boxdark dark:text-white',
    cellClassName: 'bg-gray-200 dark:bg-boxdark dark:text-white',
    resizable: false,
    width: 200, 
    renderCell: (params) => (
      key === 'status' ? (
        <Switch
          checked={params.row.status === 1}
          onChange={() => handleStatusChange(params.row)}
        />
      ) : (
        params.value
      )
    ),
  }));

  columns.push({
    field: 'actions',
    headerName: 'Actions',
    headerClassName: 'bg-gray-200 dark:bg-boxdark dark:text-white text-center',
    width: 140,
    resizable: false,
    renderCell: (params) => (
      <div className="flex justify-center items-center w-full h-full"> 
        <button
          onClick={() => handleDelete(params.row)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          <MdDelete /> 
        </button>
        <Link
          to={`${params.row.id}`}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex"
        >
          <MdEdit /> 
        </Link>
      </div>
      
    ),
  });

  const handleDelete = async (cinema: any) => {
    try {
      await onDelete(cinema); 
    } catch (error) {
      console.error(`Error deleting cinema:`, error);
    }
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
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-4"> 
        <div className="relative flex items-center">
          <div className="relative flex items-center"> {/* Thêm flex items-center */}
            <input
              type="text"
              className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <BsSearch className="absolute right-2 top-2" size={20} /> {/* Đặt icon vào bên trong */}
          </div>
        </div>
        <div className="flex items-center ">
          <Link
            to="create"
            className=" inline-flex items-center justify-center rounded-md border border-primary py-2 px-10 text-center font-medium text-primary hover:bg-opacity-90 lg:px-20 xl:px-20 mb-8 mx-4 h-10"
          >
            Create 
          </Link>
        </div>
      </div>
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
          resize
        />
      </div>
    </div>
  );
};
export default TableTest;