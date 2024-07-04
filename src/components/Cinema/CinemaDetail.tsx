import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { cinema } from '../../types/cinema';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import ScreenList from './ScreenList';
const CinemaDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [cinema, setCinema] = useState<cinema | null>(null);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCinema = async () => {
      try {
        const response = await fetch(`https://bl924snd-3000.asse.devtunnels.ms/cinema/${id}`); // Replace with actual path
        if (!response.ok) {
          throw new Error('Failed to fetch cinema details');
        }
        const data = await response.json();
        const { id: cinemaId, name, address, provinceCity } = data;
        setCinema({ id: cinemaId, name, address, provinceCity });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cinema details:', error);
        setLoading(false);
      }
    };

    fetchCinema();
  }, [id]);

  const handleSaveChanges = () => {
    console.log('Saving changes:', cinema);
    navigate('/cinema');
  };

  const handleDeleteCinema = async () => {
    try {
      const response = await fetch(`https://bl924snd-3000.asse.devtunnels.ms/cinema/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete cinema');
      }
      console.log('Cinema deleted');
      navigate('/cinema');
    } catch (error) {
      console.error('Error deleting cinema:', error);
    }
  };

  if (loading) {
    return <div>Loading cinema details...</div>;
  }

  if (!cinema) {
    return <div>Error fetching cinema details</div>;
  }

  return (
    <>
      <Breadcrumb pageName="Cinema Detail" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9 py-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-2 px-6.5 dark:border-strokedark">
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white font-extrabold">
                  Cinema Name
                </label>
                <input
                  type="text"
                  defaultValue={cinema.name}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white font-extrabold">
                  Address
                </label>
                <input
                  type="text"
                  defaultValue={cinema.address}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white font-extrabold">
                  Province/City ID
                </label>
                <input
                  type="text"
                  defaultValue={cinema.provinceCity.toString()}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <button
                className="mt-4 px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
              <button
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                onClick={handleDeleteCinema}
                style={{ alignSelf: 'flex-end' }}
              >
                Delete Cinema
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-extrabold"></div>
          <Link
            to="/create"
            className="inline-flex items-center justify-center rounded-md border border-primary py-2 px-4 text-center font-medium text-primary hover:bg-opacity-90 lg:px-4 xl:px-12"
          >
            Create Screen
          </Link>
        </div>
        <ScreenList />
      </div>
    </>
  );
};

export default CinemaDetail;
