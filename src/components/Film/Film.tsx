import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import FilmTable from '../Tables/FilmTable';

const Film: React.FC = () => {
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
      <FilmTable/>
    </>
  );
};

export default Film;
