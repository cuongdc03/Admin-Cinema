import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import  Switch  from '@mui/material/Switch';

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
    flex: 1, // Cho phép cột tự điều chỉnh chiều rộng
    width: 150, // Khóa chiều rộng cột (nếu cần)
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
    headerClassName: 'bg-gray-200 dark:bg-boxdark dark:text-white',
    width: 150,
    renderCell: (params) => (
      <>
        <button
          onClick={() => handleDelete(params.row)} // Gọi handleDelete với đối tượng cinema
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Xoá
        </button>
        <Link
          to={`/cinema/${params.row.id}`} // Chuyển hướng đến trang cập nhật
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
        >
          Update
        </Link>
      </>
    ),
  });

  const handleDelete = async (cinema: any) => {
    try {
      await onDelete(cinema); // Gọi onDelete với đối tượng cinema
      // Cập nhật lại dữ liệu trong rows (nếu cần)
    } catch (error) {
      console.error(`Error deleting cinema:`, error);
      // Xử lý lỗi (ví dụ: hiển thị thông báo lỗi)
    }
  };

  const handleStatusChange = async (cinema: any) => {
    try {
      // Thay đổi trạng thái status
      const updatedCinema = { ...cinema, status: cinema.status === 1 ? 0 : 1 };
      await onStatusChange(updatedCinema); 
      // Cập nhật lại dữ liệu trong rows (nếu cần)
    } catch (error) {
      console.error(`Error changing status:`, error);
      // Xử lý lỗi (ví dụ: hiển thị thông báo lỗi)
    }
  };

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        className="rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark"
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10, 20]}
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default TableTest;