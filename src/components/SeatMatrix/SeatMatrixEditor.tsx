import React, { useState } from 'react';

interface SeatMatrixEditorProps {
  seatMatrix: any[];
  onChange: (newMatrix: any[]) => void;
}

const SeatMatrixEditor: React.FC<SeatMatrixEditorProps> = ({
  seatMatrix,
  onChange,
}) => {
  const [updatedSeatMatrix, setUpdatedSeatMatrix] = useState(seatMatrix);

  const handleSeatChange = (row: number, col: number) => {
    setUpdatedSeatMatrix((prevMatrix) => {
      const newMatrix = [...prevMatrix];
      newMatrix[row].rowSeats[col].isSeat = !newMatrix[row].rowSeats[col].isSeat;
      return newMatrix;
    });
  };

  return (
    <div>
      {/* Hiển thị ma trận ghế */}
      {updatedSeatMatrix.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.rowSeats.map((seat, colIndex) => (
            <button
              key={colIndex}
              onClick={() => handleSeatChange(rowIndex, colIndex)}
              style={{
                backgroundColor: seat.isSeat ? 'green' : 'red',
                margin: '2px',
              }}
            >
              {seat.isSeat ? 'Seat' : 'Disable'}
            </button>
          ))}
        </div>
      ))}
      {/* Nút "Save" */}
      <button onClick={() => onChange(updatedSeatMatrix)}>Save</button>
    </div>
  );
};

export default SeatMatrixEditor;