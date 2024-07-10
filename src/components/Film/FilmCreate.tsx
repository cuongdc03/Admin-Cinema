import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';

const FilmCreate: React.FC = () => {
  const navigate = useNavigate();
  const [filmData, setFilmData] = useState({
    filmName: '',
    duration: '',
    category: '',
    dateStart: '',
    dateEnd: '',
    director: '',
    actor: '',
    subtitle: false,
    dubbing: false,
    format: '',
    ageRate: '',
    poster: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFilmData({ ...filmData, [name]: value });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
    setFilmData({ ...filmData, [name]: event.target.checked });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleCreateFilm = async () => {
    try {
      const formData = new FormData();
      formData.append('filmName', filmData.filmName);
      formData.append('duration', filmData.duration);
      formData.append('category', filmData.category);
      formData.append('dateStart', filmData.dateStart);
      formData.append('dateEnd', filmData.dateEnd);
      formData.append('director', filmData.director);
      formData.append('actor', filmData.actor);
      formData.append('subtitle', filmData.subtitle ? 'true' : 'false');
      formData.append('dubbing', filmData.dubbing ? 'true' : 'false');
      formData.append('format', filmData.format);
      formData.append('ageRate', filmData.ageRate);
      if (selectedFile) {
        formData.append('poster', selectedFile);
      }

      const response = await fetch('https://bl924snd-3000.asse.devtunnels.ms/admin/film', { 
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to create film');
      }
      navigate('/film');
    } catch (error) {
    }
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
                  value={filmData.filmName}
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
                  value={filmData.duration}
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
                  value={filmData.category}
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
                  value={filmData.dateStart}
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
                  value={filmData.dateEnd}
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
                  value={filmData.director}
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
                  value={filmData.actor}
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
                  checked={filmData.subtitle}
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
                  checked={filmData.dubbing}
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
                  value={filmData.format}
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
                  value={filmData.ageRate}
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
        <div className='col-span-1 py-9 w-full'>
          <div className='rounded-lg border border-stroke shadow-default dark:border-strokedark'>
            <input 
              type="file"
              accept="image/*" 
              onChange={handleFileChange}
              className="hidden" 
              id="posterInput" 
            />
            <label htmlFor="posterInput" className="flex items-center justify-center w-full px-4 py-2 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-100 cursor-pointer">
              <span className="font-medium">Choose Picture</span>
              <svg className="ml-2 -mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 12h15m0 0l-6.75-6.75M17.25 12l6.75 6.75" /></svg>
            </label>
            <img 
              src={filmData.poster || 'placeholder.jpg'} 
              className='w-full rounded-lg mt-2'
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FilmCreate;