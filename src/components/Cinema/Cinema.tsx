import React, { useState, useEffect } from 'react';
import TableTest from '../Table';
import { cinema } from '../../types/cinema'; // Import kiểu dữ liệu cinema

const Cinema: React.FC = () => {
  const [cinemas, setCinemas] = useState<cinema[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState<string | null>(null); // Trạng thái lỗi

  const handleDeleteCinema = async (cinema: cinema) => {
    try {
      const response = await fetch(`https://bl924snd-3000.asse.devtunnels.ms/cinema/${cinema.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete cinema');
      }
      // Cập nhật lại dữ liệu `cinemas` sau khi xóa thành công
      setCinemas(cinemas.filter((c) => c.id !== cinema.id));
    } catch (error) {
      console.error('Error deleting cinema:', error);
      // Xử lý lỗi (ví dụ: hiển thị thông báo lỗi)
    }
  };

  const handleStatusChange = async (cinema: cinema) => {
    try {
      const response = await fetch(`https://bl924snd-3000.asse.devtunnels.ms/cinema/${cinema.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cinema),
      });

      if (!response.ok) {
        throw new Error('Failed to update cinema status');
      }

      // Cập nhật lại trạng thái cinema trong mảng cinemas
      setCinemas(cinemas.map((c) => (c.id === cinema.id ? cinema : c)));
    } catch (error) {
      console.error('Error updating cinema status:', error);
      // Xử lý lỗi (ví dụ: hiển thị thông báo lỗi)
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('https://bl924snd-3000.asse.devtunnels.ms/cinema');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setCinemas(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const displayedColumns: (keyof cinema)[] = ['id', 'name', 'address', 'provinceCity', 'status']; // Các thuộc tính muốn hiển thị

  return (
    <div>
      {isLoading ? (
        <p>Loading cinemas...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <TableTest
          rows={cinemas}
          displayedColumns={displayedColumns}
          onDelete={handleDeleteCinema}
          onStatusChange={handleStatusChange} // Pass hàm handleStatusChange
        />
      )}
    </div>
  );
};

export default Cinema;