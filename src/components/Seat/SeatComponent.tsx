import React from 'react';
import { seat } from '../../types/seat';

interface SeatProps {
  seat: seat;
  onToggle: (seat: seat) => void; // Truyền object Seat vào onToggle
}

const SeatComponent: React.FC<SeatProps> = ({ seat, onToggle }) => {
  const handleToggle = () => {
    onToggle({
      ...seat,
      isSeat: !seat.isSeat, // Đảo ngược trạng thái isSeat
    });
  };

  return (
    <button
      onClick={handleToggle}
      style={{
        backgroundColor: seat.isSeat ? 'white' : 'gray',
        border: '1px solid black',
        margin: '2px',
        width: '30px',
        height: '30px',
      }}
    >
      {seat.name}
    </button>
  );
};

export default SeatComponent;
