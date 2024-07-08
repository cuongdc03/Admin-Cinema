import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import Switch from '@mui/material/Switch';
import { MdDelete, MdEdit } from 'react-icons/md';

interface TableTestProps<T> {
  rows: T[];
  onDelete: (cinema: T) => void; // Hàm xử lý xóa nhận đối tượng cinema
  onStatusChange: (cinema: T) => void; // Hàm xử lý thay đổi trạng thái
  displayedColumns: (keyof T)[]; // Các thuộc tính muốn hiển thị
}

const TableTest: React.FC<TableTestProps<any>> = ({ rows, onDelete, onStatusChange, displayedColumns }) => {
  if (rows.length === 0) {
    return <p className="text-center text-gray-500">Không có dữ liệu</p>;
  }

  const columns: GridColDef[] = displayedColumns.map((key) => ({
    field: key,
    headerName: key.charAt(0).toUpperCase() + key.slice(1),
    headerClassName: 'bg-gray-200 dark:bg-boxdark dark:text-white',
    cellClassName: 'bg-gray-200 dark:bg-boxdark dark:text-white',
    resizable: false,
    width: 200, // Khóa chiều rộng cột (nếu cần)
    renderCell: (params) => (
      key === 'status' ? (
        <Switch
          checked={params.row.status === 1} // Kiểm tra trạng thái
          onChange={() => handleStatusChange(params.row)} // Gọi handleStatusChange
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
    renderCell: (params) => (
      <div className="flex justify-center items-center"> 
        {/* Thêm items-center để căn giữa theo chiều dọc */}
        <button
          onClick={() => handleDelete(params.row)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          <MdDelete /> 
        </button>
        <Link
          to={`${params.row.id}`}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
      <div className="flex justify-end mb-4"> {/* Căn nút Create sang bên phải */}
        <Link
          to="create"
          className="inline-flex items-center justify-center rounded-md border border-primary py-2 px-10 text-center font-medium text-primary hover:bg-opacity-90 lg:px-20 xl:px-20 mb-8 mx-4"
        >
          Create 
        </Link>
      </div>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          className="rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark"
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10, 20]}
          disableRowSelectionOnClick
          autoHeight
          autoWidth
        />
      </div>
    </div>
  );
};

export default TableTest;