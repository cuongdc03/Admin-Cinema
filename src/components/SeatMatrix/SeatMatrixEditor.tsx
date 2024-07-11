import React, { useState } from 'react';
import screenimg from '../../assets/img-screen.png';
import SeatComponent from '../Seat/SeatComponent';

interface SeatMatrixEditorProps {
  seatMatrix: string;
  onChange: (newMatrix: string) => void;
}

interface Seat {
  price: number;
  isSeat: boolean;
  name: string;
  isOff: boolean;
  isSold: boolean;
  onHold: string;
  colId: number;
  seatId: number;
}

interface RowData {
  rowName: string;
  rowSeats: Seat[];
}

const SeatMatrixEditor: React.FC<SeatMatrixEditorProps> = ({
  seatMatrix,
  onChange,
}) => {
  const [updatedSeatMatrix, setUpdatedSeatMatrix] = useState<RowData[]>(
    JSON.parse(seatMatrix).data || []
  );

  const handleSeatChange = (rowIndex: number, colIndex: number) => {
    setUpdatedSeatMatrix((prevMatrix) => {
      const newMatrix = [...prevMatrix];
      newMatrix[rowIndex].rowSeats[colIndex].isSeat =
        !newMatrix[rowIndex].rowSeats[colIndex].isSeat;
      return newMatrix;
    });
  };

  const handleSave = () => {
    const newSeatMatrix = JSON.stringify({ data: updatedSeatMatrix });
    onChange(newSeatMatrix);
  };

  return (
    <div>
      <div className='bg-black'> 
        <img src={screenimg} alt="Screen" /> {/* Added alt attribute for accessibility */}
      </div>
      <div className='flex justify-center' // You might want to adjust styling here 
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${
            updatedSeatMatrix[0]?.rowSeats.length || 1
          }, 30px)`,
        }}
      >
        {updatedSeatMatrix.map((row, rowIndex) =>
          row.rowSeats.map((seat, colIndex) => (
            <SeatComponent
              key={`${rowIndex}-${colIndex}`}
              seat={seat}
              onToggle={(updatedSeat) => {
                setUpdatedSeatMatrix((prevMatrix) => {
                  const newMatrix = [...prevMatrix];
                  newMatrix[rowIndex].rowSeats[colIndex] = updatedSeat;
                  return newMatrix;
                });
              }}
            />
          ))
        )}
      </div> 
      <button onClick={handleSave}>Save</button>
    </div>
  ); 
}; // Closing parenthesis for the component

export default SeatMatrixEditor;