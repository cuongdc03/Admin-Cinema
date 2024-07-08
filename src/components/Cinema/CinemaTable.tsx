import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { cinema } from '../../types/cinema';
import SwitcherFour from '../Switchers/SwitcherFour';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { MdModeEditOutline } from "react-icons/md";
interface cinemasProps {
  cinemas: cinema[];
  fetchCinemas: () => void;
}

const CinemaTable: React.FC<cinemasProps> = ({ cinemas, fetchCinemas }) => {
  const [switchStates, setSwitchStates] = useState<boolean[]>([]);

  useEffect(() => {
    fetchCinemas();
  }, []);

  useEffect(() => {
    // Initialize the switch states based on the cinemas array length
    setSwitchStates(new Array(cinemas.length).fill(false));
  }, [cinemas]);

  const toggleSwitch = (index: number) => {
    setSwitchStates(prevStates => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Cinema List
        </h4>
      </div>

      <div className="grid grid-cols-8 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-11 md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Cinema Name</p>
        </div>
        <div className="col-span-3 hidden items-center sm:flex">
          <p className="font-medium">Address</p>
        </div>
        <div className="col-span-3 flex items-center">
          <p className="font-medium">ProvinceCity</p>
        </div>
        <div className='col-span-2 flex items-center'>
          <p className='font-medium'>Status</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Action</p>
        </div>
      </div>

      {cinemas.map((cinema, index) => (
        <div
          className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-11 md:px-6 2xl:px-7.5"
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
          <div className="col-span-3 flex items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {cinema.address}
            </p>
          </div>
          <div className="col-span-3 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {cinema.provinceCity}
            </p>
          </div>
          <div className='col-span-2'>
            <SwitcherFour
              enabled={switchStates[index]}
              toggle={() => toggleSwitch(index)}
            />
          </div>
          <div className='col-span-1 flex items-center'>
            <Link
              to={`/cinema/${cinema.id}`}
              className="text-sm text-blue-600 hover:underline"
            >
              <MdModeEditOutline/>
            </Link>
            <Link
              to={`/cinema/${cinema.id}`}
              className="text-sm text-blue-600 hover:underline"
            >
              <RiDeleteBin6Fill/>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CinemaTable;
