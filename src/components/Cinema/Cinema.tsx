import React, { useState, useEffect } from 'react';
import TableTest from '../Table';
import { cinema } from '../../types/cinema';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';

const Cinema: React.FC = () => {
  const [cinemas, setCinemas] = useState<cinema[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteCinema = async (cinema: cinema) => {
    try {
      const response = await fetch(
        `https://bl924snd-3000.asse.devtunnels.ms/cinema/${cinema.id}`,
        {
          method: 'DELETE',
        },
      );
      if (!response.ok) {
        throw new Error('Failed to delete cinema');
      }
      setCinemas(cinemas.filter((c) => c.id !== cinema.id));
    } catch (error) {
      console.error('Error deleting cinema:', error);
    }
  };

  const handleStatusChange = async (cinema: cinema) => {
    try {
      const response = await fetch(
        `https://bl924snd-3000.asse.devtunnels.ms/cinema/${cinema.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(cinema),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to update cinema status');
      }

      setCinemas(cinemas.map((c) => (c.id === cinema.id ? cinema : c)));
    } catch (error) {
      console.error('Error updating cinema status:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          'https://bl924snd-3000.asse.devtunnels.ms/cinema',
        );
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

  const displayedColumns: (keyof cinema)[] = [
    'id',
    'name',
    'address',
    'provinceCity',
  ];

  return (
    <div>
      <Breadcrumb pageName="Cinema" />
      <TableTest
        rows={cinemas}
        displayedColumns={displayedColumns}
        onDelete={handleDeleteCinema}
        onStatusChange={handleStatusChange}
        isCinema={true}
      />
    </div>
  );
};

export default Cinema;
