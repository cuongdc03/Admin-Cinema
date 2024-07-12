import React, { useState, useEffect } from 'react';
import { cinema } from '../../types/cinema';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import { deleteCinema, getCinemas, updateCinema } from '../../apis/cinema';
import Table from '../Table';

const Cinema: React.FC = () => {
  const [cinemas, setCinemas] = useState<cinema[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteCinema = async (cinema: cinema) => {
    try {
      await deleteCinema(cinema.id, setCinemas);
    } catch (error) {
      console.error('Error deleting cinema:', error);
    }
  };

  const handleStatusChange = async (cinema: cinema) => {
    try {
      await updateCinema(cinema.id, cinema, setCinemas);
    } catch (error) {
      console.error('Error updating cinema status:', error);
    }
  };

  const fetchCinemaList = async () => {
      const cinemas = await getCinemas();
      setCinemas(cinemas);
  };

  useEffect(() => {
    fetchCinemaList();
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
      <Table
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