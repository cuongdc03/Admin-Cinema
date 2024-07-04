import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import CinemaTable from './CinemaTable';
import { cinema } from '../../types/cinema';


const Cinema: React.FC = () => {
  const [cinemas, setCinemas] = useState<cinema[]>([]);
  const fetchCinemas = async () => {
    try {
      const response = await fetch('https://bl924snd-3000.asse.devtunnels.ms/cinema'); 
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setCinemas(data);
    } catch (error) {
      console.error('Error fetching cinemas:', error);
    }
  };
  return (
    <div>
      <Breadcrumb pageName='Cinema' />
      <Link
        to=""
        onClick={fetchCinemas}
        className="inline-flex items-center justify-center rounded-md border border-primary py-2 px-10 text-center font-medium text-primary hover:bg-opacity-90 lg:px-20 xl:px-20 mb-8 mx-4"
      >
        Refresh 
      </Link>
      <Link
        to="create"
        className="inline-flex items-center justify-center rounded-md border border-primary py-2 px-10 text-center font-medium text-primary hover:bg-opacity-90 lg:px-20 xl:px-20 mb-8 mx-4"
      >
        Create 
      </Link>
      <CinemaTable
      cinemas={cinemas}
      fetchCinemas={fetchCinemas} />
    </div>
  );
};

export default Cinema;
