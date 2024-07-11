import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { MdDelete, MdEdit } from 'react-icons/md';
import ModalForScreenEdit from '../Modal/ModalForScreenEdit';


interface ScreenListProps {
  cinemaId: number;
  screenList: any[];
  onEdit: (screen: any) => void;
}

const ScreenList: React.FC<ScreenListProps> = ({ cinemaId, screenList, onEdit }) => {
  const [screens, setScreens] = useState<any[]>(screenList);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedScreen, setSelectedScreen] = useState<any | null>(null);
  const [modalKey, setModalKey] = useState(0);

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
    setScreens(screenList.map((screen: any) => ({
      ...screen,
      totalSeats: countSeats(screen),
    })));
  }, [screenList, countSeats]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 300, resizable: false },
    { field: 'name', headerName: 'Screen Name', width: 300, resizable: false },
    {
      field: 'totalSeats',
      headerName: 'Total Seats',
      width: 200,
      resizable: false,
      renderCell: (params) => {
        const screen = params.row;
        return screen.totalSeats || 0; // Display totalSeats if available, otherwise 0
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      resizable: false,
      headerAlign: 'center',
      align: 'center',
      width: 200,
      headerClassName: 'ml-auto', // Áp dụng class Tailwind
      renderCell: (params) => (
        <div className="flex justify-center items-center gap-4 h-full">
            <button
            onClick={() => handleEdit(params.row)}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex"
          >
            <MdEdit />
          </button>
          <button
            onClick={() => handleDelete(params.row)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            <MdDelete />
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
    setSelectedScreen(screen);
    setModalKey((prevKey) => prevKey + 1); // Tăng key mỗi khi mở Modal
    setIsModalOpen(true);
  };
  const handleScreenSave = async (screenData: any) => {
    try {
      // ... Implement your save logic here ...
      console.log("Saving screen data:", screenData);
      onEdit(screenData);
    } catch (error) {
      // ... Handle errors ...
    } finally {
      setIsModalOpen(false);
    }
  };
  return (
    <div style={{ height: 400, width: '100%' }}>
      {loading ? (
        <div>Loading screens...</div>
      ) : (
        <>
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
        <ModalForScreenEdit
        key={modalKey} 
        isVisible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleScreenSave}
        screen={selectedScreen}
        />
        </>
      )}
    </div>
  );
};

export default ScreenList;