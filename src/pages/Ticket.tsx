import React, { useEffect, useState } from 'react';
import { seat } from '../types/seat';
import './Ticket.css';

type ApiResponse = {
  id: number;
  seatMatrix: string;
  cinemaId: number;
  name: string;
  len: number | null;
  width: number | null;
};

type SeatMatrix = {
  rowName: string;
  rowSeats: seat[];
};

const Ticket: React.FC = () => {
  const [seats, setSeats] = useState<SeatMatrix[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSeats() {
      try {
        const response = await fetch('https://bl924snd-3000.asse.devtunnels.ms/screen/19'); // Thay URL_CUA_API bằng URL thực tế của bạn
        const data: ApiResponse = await response.json();
        const seatMatrix: SeatMatrix[] = JSON.parse(data.seatMatrix).data;

        setSeats(seatMatrix);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch seats');
        setLoading(false);
      }
    }

    fetchSeats();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="ticket-page">
      <h1>Ticket Page</h1>
      <p>This will display Ticket listings, schedules, reviews, etc.</p>
      <div>
        <h2>Seat List</h2>
        {seats.map(row => (
          <div key={row.rowName} className="seat-row">
            <h3>Row {row.rowName}</h3>
            <div className="seat-row-items">
              {row.rowSeats.map(seat => (
                <div key={seat.seatId} className="seat-item">
                  <p>{seat.name}</p>
                  <p>{seat.isSold ? 'Sold' : 'Available'}</p>
                  <p>${seat.price}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ticket;
