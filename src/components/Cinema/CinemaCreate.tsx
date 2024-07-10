import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import { cinema } from '../../types/cinema';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CinemaCreate: React.FC = () => {
  const [newCinema, setNewCinema] = useState<cinema>({
    id: 0,
    name: '',
    address: '',
    provinceCity: '',
    provinceCityId: 0,
    status: false,
  });

  const [provinceCities, setProvinceCities] = useState<
    { id: number; name: string }[]
  >([]);
  const [error, setError] = useState<string>('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    fetch('https://bl924snd-3000.asse.devtunnels.ms/admin/provincecity')
      .then((response) => response.json())
      .then((data) => setProvinceCities(data))
      .catch((error) => {
        toast.error('Error fetching province/city data. Please try again.');
      });
  }, []);

  const navigate = useNavigate();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setError('');
    if (name === 'provinceCity') {
      const selectedCity = provinceCities.find((city) => city.name === value);
      setNewCinema((prevCinema) => ({
        ...prevCinema,
        [name]: value,
        provinceCityId: selectedCity ? selectedCity.id : 0,
      }));
    } else {
      setNewCinema((prevCinema) => ({
        ...prevCinema,
        [name]: value,
      }));
    }

    setIsFormValid(
      !!newCinema.name && !!newCinema.address && !!newCinema.provinceCity,
    );
  };

  const handleSaveChanges = () => {
    if (!isFormValid) {
      setError('Please fill out all fields.');
      toast.error('Please fill out all fields.');
      return;
    }

    const cinemaData = {
      name: newCinema.name,
      address: newCinema.address,
      provinceCityId: newCinema.provinceCityId,
    };

    fetch('https://bl924snd-3000.asse.devtunnels.ms/admin/cinema', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cinemaData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        toast.success('Cinema created successfully!');
        setError('');
        setTimeout(() => {
          navigate('/cinema');
        }, 2000);
      })
      .catch((error) => {
        toast.error('Error creating cinema. Please try again.');
      });
  };

  return (
    <>
      <Breadcrumb pageName="Create New Cinema" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-2 px-6.5 dark:border-strokedark"></div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white font-extrabold">
                  Cinema Name <span className="text-red-500">*</span>
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
                  Address <span className="text-red-500">*</span>
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
                  Province/City <span className="text-red-500">*</span>
                </label>
                <select
                  name="provinceCity"
                  value={newCinema.provinceCity}
                  onChange={handleChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                >
                  <option value="" disabled>
                    Select Province/City
                  </option>
                  {provinceCities.map((city) => (
                    <option key={city.id} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                className="mt-4 px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
                onClick={handleSaveChanges}
                disabled={!isFormValid}
              >
                Save Cinema
              </button>

              {error && <div className="text-red-500">{error}</div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CinemaCreate;
