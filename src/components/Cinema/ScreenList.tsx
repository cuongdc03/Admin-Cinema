import React, { useState, useEffect, useCallback } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { MdDelete, MdEdit } from 'react-icons/md';
import { BsEyeFill } from 'react-icons/bs';

interface ScreenListProps {
  cinemaId: number;
  onEdit: (screen: any) => void; // Callback to EditCinema
}

const ScreenList: React.FC<ScreenListProps> = ({ cinemaId, onEdit }) => {
  const [screens, setScreens] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const countSeats = useCallback((screen: any) => {
    if (screen.seatMatrix) {
      const parsedSeatMatrix = JSON.parse(screen.seatMatrix);
      return parsedSeatMatrix.data.reduce((acc, row) => {
        return acc + row.rowSeats.filter((seat) => seat.isSeat).length;
      }, 0);
    }
    return 0;
  }, []);

  useEffect(() => {
    const fetchScreens = async () => {
      try {
        const response = await fetch(
          `https://bl924snd-3000.asse.devtunnels.ms/admin/cinema/${cinemaId}`,
        );
        if (!response.ok) {
          throw new Error('Failed to fetch screens');
        }
        const data = await response.json();
        // Add totalSeats when fetching the data
        const updatedScreens = data.screenList.map((screen: any) => ({
          ...screen,
          totalSeats: countSeats(screen),
        }));
        setScreens(updatedScreens);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching screens:', error);
        setLoading(false);
      }
    };

    fetchScreens();
  }, [cinemaId, countSeats]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 150, resizable: false },
    { field: 'name', headerName: 'Screen Name', width: 200, resizable: false },
    { field: 'len', headerName: 'Length', width: 150, resizable: false },
    { field: 'width', headerName: 'Width', width: 150, resizable: false },
    {
      field: 'totalSeats',
      headerName: 'Total Seats',
      width: 200,
      resizable: false,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      resizable: false,
      width: 200,
      renderCell: (params) => (
        <div className="flex justify-center items-center gap-4 h-full">
          <button
            onClick={() => handleDelete(params.row)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            <MdDelete />
          </button>
          <Link
            to={`/screen/${params.row.id}/seatmatrix`}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex"
          >
            <BsEyeFill />
          </Link>
          <button
            onClick={() => handleEdit(params.row)}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex"
          >
            <MdEdit />
          </button>
        </div>
      ),
    },
  ];

  const handleDelete = async (screen: any) => {
    // Implement your screen deletion logic here
    // You'll likely need to make an API call to your backend to delete the screen
    // Example (replace with your actual API call):
    // try {
    //   const response = await fetch(`https://bl924snd-3000.asse.devtunnels.ms/admin/screen/${screen.id}`, { method: 'DELETE' });
    //   if (!response.ok) {
    //     throw new Error('Failed to delete screen');
    //   }
    //   // Update the screens state to remove the deleted screen
    // } catch (error) {
    //   console.error('Error deleting screen:', error);
    // }
  };

  const handleEdit = (screen: any) => {
    // Call the function in EditCinema to set screenToEdit and showModal
    onEdit(screen);
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      {loading ? (
        <div>Loading screens...</div>
      ) : (
        <DataGrid
          className="rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark"
          rows={screens}
          columns={columns}
          pageSizeOptions={[5, 10, 20]}
          disableRowSelectionOnClick
          autoHeight
          disableColumnFilter
          disableColumnSelector
        />
      )}
    </div>
  );
};

export default ScreenList;
