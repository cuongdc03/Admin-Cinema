import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import TableTest from '../Table';
import { show } from '../../types/show';

const Show: React.FC = () => {
  const [Shows, setShow] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://bl924snd-3000.asse.devtunnels.ms/Show',
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setShow(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const displayedColumns: (keyof show)[] = [
    'id',
    'filmName',
    'timeStart',
    'price',
    'status',
  ]; // Các thuộc tính muốn hiển thị

  return (
    <>
      <Breadcrumb pageName="Show" />
      <TableTest rows={Shows} displayedColumns={displayedColumns} />
    </>
  );
};

export default Show;
