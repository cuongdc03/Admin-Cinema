import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import CinemaTable from './CinemaTable';

const Cinema: React.FC = () => {
  return (
    <div>
      <Breadcrumb pageName='Cinema' />
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
      <CinemaTable />
    </div>
  );
};

export default Cinema;
