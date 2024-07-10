import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { film } from '../../types/film';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';

const FilmDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [filmDetail, setFilmDetail] = useState<film | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchFilmDetail = async () => {
      try {
        const response = await fetch(
          `https://bl924snd-3000.asse.devtunnels.ms/admin/film/${id}`,
        );
        if (!response.ok) {
          throw new Error('Failed to fetch film details');
        }
        const data: film = await response.json();
        setFilmDetail(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching film details:', error);
        setLoading(false);
      }
    };
    fetchFilmDetail();
  }, [id]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFilmDetail({ ...filmDetail, [name]: value });
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string,
  ) => {
    setFilmDetail({ ...filmDetail, [name]: event.target.checked });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSaveChanges = async () => {
    if (filmDetail) {
      try {
        const formData = new FormData();
        formData.append('filmName', filmDetail.filmName);
        formData.append('duration', filmDetail.duration);
        formData.append('category', filmDetail.category);
        formData.append('dateStart', filmDetail.dateStart);
        formData.append('dateEnd', filmDetail.dateEnd);
        formData.append('director', filmDetail.director);
        formData.append('actor', filmDetail.actor);
        formData.append('subtitle', filmDetail.subtitle ? 'true' : 'false');
        formData.append('dubbing', filmDetail.dubbing ? 'true' : 'false');
        formData.append('format', filmDetail.format);
        formData.append('ageRate', filmDetail.ageRate);
        if (selectedFile) {
          formData.append('poster', selectedFile);
        }

        const response = await fetch(
          `https://bl924snd-3000.asse.devtunnels.ms/admin/film/${id}`,
          {
            method: 'PUT',
            body: formData,
          },
        );

        if (!response.ok) {
          throw new Error('Failed to save changes');
        }
        console.log('Film updated successfully');
        navigate('/film');
      } catch (error) {
        console.error('Error saving changes:', error);
      }
    }
  };

  const handleDeleteFilm = async () => {
    try {
      const response = await fetch(
        `https://bl924snd-3000.asse.devtunnels.ms/film/${id}`,
        {
          method: 'DELETE',
        },
      );
      if (!response.ok) {
        throw new Error('Failed to delete film');
      }
      console.log('Film deleted');
      navigate('/film');
    } catch (error) {
      console.error('Error deleting film:', error);
    }
  };

  if (loading) {
    return <div>Loading film details...</div>;
  }

  if (!filmDetail) {
    return <div>Error fetching film details</div>;
  }

  return (
    <>
      <Breadcrumb pageName="Film Detail" />

      <div className="grid grid-cols-3 gap-9">
        <div className="flex flex-col gap-9 py-9 col-span-2">
          <div className="rounded-sm border border-stroke shadow-default dark:border-strokedark">
            <div className="border-b border-stroke py-2 px-6.5 dark:border-strokedark">
              <h2 className="text-2xl font-semibold text-black dark:text-white">
                <input
                  type="text"
                  name="filmName"
                  value={filmDetail.filmName}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </h2>
            </div>
            <div className=" grid grid-cols-2 gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white font-extrabold">
                  Duration
                </label>
                <input
                  type="number"
                  name="duration"
                  value={filmDetail.duration}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white font-extrabold">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={filmDetail.category}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white font-extrabold">
                  Date Start
                </label>
                <input
                  type="date"
                  name="dateStart"
                  value={filmDetail.dateStart}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white font-extrabold">
                  Date End
                </label>
                <input
                  type="date"
                  name="dateEnd"
                  value={filmDetail.dateEnd}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white font-extrabold">
                  Director
                </label>
                <input
                  type="text"
                  name="director"
                  value={filmDetail.director}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white font-extrabold">
                  Actor
                </label>
                <input
                  type="text"
                  name="actor"
                  value={filmDetail.actor}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white font-extrabold">
                  Subtitle
                </label>
                <input
                  type="checkbox"
                  name="subtitle"
                  checked={filmDetail.subtitle}
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
                  checked={filmDetail.dubbing}
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
                  value={filmDetail.format}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white font-extrabold">
                  Age Rate
                </label>
                <input
                  type="text"
                  name="ageRate"
                  value={filmDetail.ageRate}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <button
                className="mt-4 px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-1 py-9 w-full">
          <div className="rounded-lg border border-stroke shadow-default dark:border-strokedark">
            <img
              src={filmDetail.poster || 'placeholder.jpg'}
              className="w-full rounded-lg mt-2"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="posterInput"
            />
            <label
              htmlFor="posterInput"
              className="flex items-center justify-center w-full px-4 py-2 mt-2 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-100 cursor-pointer"
            >
              <span className="font-medium">Choose Picture</span>
              <svg
                className="ml-2 -mr-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.5 12h15m0 0l-6.75-6.75M17.25 12l6.75 6.75"
                />
              </svg>
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilmDetail;
