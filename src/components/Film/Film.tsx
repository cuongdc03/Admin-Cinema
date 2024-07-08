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
      <TableTest rows={Films} displayedColumns={displayedColumns}/>
    </>
  );
};

export default Film;
