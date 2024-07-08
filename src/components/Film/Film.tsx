import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import FilmTable from '../Tables/FilmTable';
import TableTest from '../Table';
import { film } from '../../types/film';

const Film: React.FC = () => {
  const [Films, setFilm] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://bl924snd-3000.asse.devtunnels.ms/film');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setFilm(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const displayedColumns: (keyof film)[] = ['id', 'filmName', 'director', 'category', 'status']; // Các thuộc tính muốn hiển thị

  return (
    <>
      <Breadcrumb pageName="Film" />

      <Link
        to=""
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
      <TableTest rows={Films} displayedColumns={displayedColumns}/>
    </>
  );
};

export default Film;
