import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import { cinema } from '../../types/cinema';

const CinemaCreate: React.FC = () => {
  const [newCinema, setNewCinema] = useState<cinema>({
    id: 0,
    name: '',
    address: '',
    provinceCity: '',
  });

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewCinema((prevCinema) => ({
      ...prevCinema,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    // Placeholder function for saving changes
    console.log('Saving new cinema:', newCinema);
    // You can add your logic here to save the new cinema data
    // For example, send a POST request to your backend API

    // After saving, navigate to the cinema detail page
    navigate('/cinema');
  };

  return (
    <>
      <Breadcrumb pageName="Create New Cinema" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Cinema Details --> */}
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
                  name="name"
                  value={newCinema.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white font-extrabold">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={newCinema.address}
                  onChange={handleChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white font-extrabold">
                  Province/City
                </label>
                <input
                  type="text"
                  name="provinceCity"
                  value={newCinema.provinceCity}
                  onChange={handleChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              
              <button
                className="mt-4 px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
                onClick={handleSaveChanges}
              >
                Save Cinema
              </button>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CinemaCreate;
