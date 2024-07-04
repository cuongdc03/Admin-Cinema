import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { film } from '../../types/film';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';

const FilmDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [filmDetail, setFilmDetail] = useState<film | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFilmDetail = async () => {
        try {
          const response = await fetch(`https://bl924snd-3000.asse.devtunnels.ms/admin/film/${id}`); 
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

  const handleSaveChanges = () => {
    console.log('Saving changes:', filmDetail);
    navigate('/film');
  };

  const handleDeleteFilm = async () => {
    try {
      const response = await fetch(`https://bl924snd-3000.asse.devtunnels.ms/film/${id}`, {
        method: 'DELETE'
      });
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

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9 py-9">
          <div className="rounded-sm border border-stroke shadow-default dark:border-strokedark">
            <div className="border-b border-stroke py-2 px-6.5 dark:border-strokedark">
              <h2 className="text-2xl font-semibold text-black dark:text-white">
                {filmDetail.filmName}
              </h2>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white font-extrabold">
                  Duration
                </label>
                <p className="text-sm text-black dark:text-white">{filmDetail.duration} minutes</p>
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white font-extrabold">
                  Date Start
                </label>
                <p className="text-sm text-black dark:text-white">{filmDetail.dateStart}</p>
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white font-extrabold">
                  Date End
                </label>
                <p className="text-sm text-black dark:text-white">{filmDetail.dateEnd}</p>
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white font-extrabold">
                  Director
                </label>
                <p className="text-sm text-black dark:text-white">{filmDetail.director}</p>
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white font-extrabold">
                  Actor
                </label>
                <p className="text-sm text-black dark:text-white">{filmDetail.actor}</p>
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white font-extrabold">
                  Subtitle
                </label>
                <p className="text-sm text-black dark:text-white">{filmDetail.subtitle ? 'Yes' : 'No'}</p>
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white font-extrabold">
                  Dubbing
                </label>
                <p className="text-sm text-black dark:text-white">{filmDetail.dubbing ? 'Yes' : 'No'}</p>
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white font-extrabold">
                  Format
                </label>
                <p className="text-sm text-black dark:text-white">{filmDetail.format}</p>
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white font-extrabold">
                  Age Rate
                </label>
                <p className="text-sm text-black dark:text-white">{filmDetail.ageRate}</p>
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white font-extrabold">
                  Category
                </label>
                <p className="text-sm text-black dark:text-white">{filmDetail.category}</p>
              </div>

              <button
                className="mt-4 px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
              <button
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                onClick={handleDeleteFilm}
                style={{ alignSelf: 'flex-end' }}
              >
                Delete Film
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilmDetail;
