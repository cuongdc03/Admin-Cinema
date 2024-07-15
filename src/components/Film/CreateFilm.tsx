import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { createFilm } from '../../apis/film';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import { film } from '../../types/film';
import { WidgetLoader } from 'react-cloudinary-upload-widget';

const CreateFilm: React.FC = () => {
  const [newFilm, setNewFilm] = useState<film>({
    filmName: '',
    duration: 0,
    description: '',
    dateStart: '',
    dateEnd: '',
    director: '',
    actor: '',
    subtitle: false,
    dubbing: false,
    format: '',
    ageRate: '',
    category: '',
    poster: '',
    status: false,
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setNewFilm({ ...newFilm, [name]: value });
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    setNewFilm({ ...newFilm, [name]: event.target.checked });
  };

  const handleCreateFilm = async () => {
    await createFilm(newFilm);
    navigate('/film');
  };

  const handleFileUploadSuccess = (result: any) => {
    if (result.event === 'success') {
      setNewFilm({ ...newFilm, poster: result.info.url });
    }
  };

  const openWidget = () => {
    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'dsnqfhnyx',
        uploadPreset: 'vanlanhdh',
        sources: ['local', 'url'],
        multiple: false,
        cropping: false,
        folder: 'film_posters',
        resourceType: 'image',
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          handleFileUploadSuccess(result);
        }
      }
    );
    myWidget.open();
  };

  return (
    <>
      <Breadcrumb pageName="Create Film" />
      <div className="grid grid-cols-3 gap-9">
        <div className="flex flex-col gap-9 py-9 col-span-2">
          <div className="rounded-sm border border-stroke shadow-default dark:border-strokedark">
            <div className="border-b border-stroke py-2 px-6.5 dark:border-strokedark">
              <h2 className="text-2xl font-semibold text-black dark:text-white">
                <input
                  type="text"
                  name="filmName"
                  value={newFilm.filmName}
                  onChange={handleInputChange}
                  className="w-full text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
                />
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white font-extrabold">
                  Duration
                </label>
                <input
                  type="number"
                  name="duration"
                  value={newFilm.duration}
                  onChange={handleInputChange}
                  className="w-full text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
                />
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white font-extrabold">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={newFilm.category}
                  onChange={handleInputChange}
                  className="w-full text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
                />
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white font-extrabold">
                  Date Start
                </label>
                <input
                  type="date"
                  name="dateStart"
                  value={newFilm.dateStart}
                  onChange={handleInputChange}
                  className="w-full text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white font-extrabold">
                  Date End
                </label>
                <input
                  type="date"
                  name="dateEnd"
                  value={newFilm.dateEnd}
                  onChange={handleInputChange}
                  className="w-full text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white font-extrabold">
                  Director
                </label>
                <input
                  type="text"
                  name="director"
                  value={newFilm.director}
                  onChange={handleInputChange}
                  className="w-full text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white font-extrabold">
                  Actor
                </label>
                <input
                  type="text"
                  name="actor"
                  value={newFilm.actor}
                  onChange={handleInputChange}
                  className="w-full text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white font-extrabold">
                  Subtitle
                </label>
                <input
                  type="checkbox"
                  name="subtitle"
                  checked={newFilm.subtitle}
                  onChange={(event) => handleCheckboxChange(event, 'subtitle')}
                  className="w-4 h-4 text-blue-600 bg-gray-100 rounded border border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white font-extrabold">
                  Dubbing
                </label>
                <input
                  type="checkbox"
                  name="dubbing"
                  checked={newFilm.dubbing}
                  onChange={(event) => handleCheckboxChange(event, 'dubbing')}
                  className="w-4 h-4 text-blue-600 bg-gray-100 rounded border border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white font-extrabold">
                  Format
                </label>
                <input
                  type="text"
                  name="format"
                  value={newFilm.format}
                  onChange={handleInputChange}
                  className="w-full text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white font-extrabold">
                  Age Rate
                </label>
                <input
                  type="text"
                  name="ageRate"
                  value={newFilm.ageRate}
                  onChange={handleInputChange}
                  className="w-full text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
                />
              </div>
              <button
                className="mt-4 px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
                onClick={handleCreateFilm}
              >
                Create Film
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-1 py-9 w-full flex flex-col items-center">
          <div className="rounded-lg border border-stroke shadow-default dark:border-strokedark w-full flex flex-col items-center">
            <img
              src={newFilm.poster || 'placeholder.jpg'}
              className="w-full rounded-lg mt-2"
            />
            <WidgetLoader />
            <button
              onClick={openWidget}
              className="mt-4 mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Choose Picture
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateFilm;
