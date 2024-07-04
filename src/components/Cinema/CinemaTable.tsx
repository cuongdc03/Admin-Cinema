import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { cinema } from '../../types/cinema';
const CinemaTable: React.FC = () => {
  const [cinemas, setCinemas] = useState<cinema[]>([]);

  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const response = await fetch('https://bl924snd-3000.asse.devtunnels.ms/cinema'); // Corrected fetch URL
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setCinemas(data);
      } catch (error) {
        console.error('Error fetching cinemas:', error);
        // You can handle errors here, e.g., set a state to display an error message
      }
    };

    fetchCinemas();
  }, []);

  if (cinemas.length === 0) {
    return <div>Loading cinema list...</div>;
  }

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Cinema List
        </h4>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Cinema Name</p>
        </div>
        <div className="col-span-4 hidden items-center sm:flex">
          <p className="font-medium">Address</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">ProvinceCity</p>
        </div>
      </div>

      {cinemas.map((cinema) => (
        <div
          className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={cinema.id}
        >
          <div className="col-span-2 flex items-center">
            <Link
              to={`/cinema/${cinema.id}`}
              className="text-sm text-blue-600 hover:underline"
            >
              {cinema.name}
            </Link>
          </div>
          <div className="col-span-4 flex items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {cinema.address}
            </p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {cinema.provinceCity}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CinemaTable;
