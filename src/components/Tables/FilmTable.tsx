import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { film } from '../../types/film';

const FilmTable: React.FC = () => {
  const [films, setFilms] = useState<film[]>([]);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await fetch('https://bl924snd-3000.asse.devtunnels.ms/film'); 
        if (!response.ok) {
          throw new Error('Failed to fetch films');
        }
        const data = await response.json();
        setFilms(data);
      } catch (error) {
        console.error('Error fetching films:', error);

      }
    };

    fetchFilms();
  }, []);

  if (films.length === 0) {
    return <div>Loading film list...</div>;
  }

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Film List
        </h4>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Film Title</p>
        </div>
        <div className="col-span-4 hidden items-center sm:flex">
          <p className="font-medium">Director</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Release Date</p>
        </div>
      </div>

      {films.map((film) => (
        <div
          className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={film.id}
        >
          <div className="col-span-2 flex items-center">
            <Link
              to={`/film/${film.id}`}
              className="text-sm text-blue-600 hover:underline"
            >
              {film.filmName}
            </Link>
          </div>
          <div className="col-span-4 flex items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {film.director}
            </p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {film.dateStart}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilmTable;
