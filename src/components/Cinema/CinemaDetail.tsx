import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { cinema } from '../../types/cinema';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import ScreenList from './ScreenList';

const CinemaDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [cinemaDetail, setCinemaDetail] = useState<cinema | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCinema = async () => {
      try {
        const response = await fetch(`https://bl924snd-3000.asse.devtunnels.ms/cinema/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch cinema details');
        }
        const data = await response.json();
        const { id: cinemaId, name, address, provinceCity, provinceCityId } = data;
        setCinemaDetail({ id: cinemaId, name, address, provinceCity, provinceCityId });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cinema details:', error);
        setLoading(false);
      }
    };

    fetchCinema();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCinemaDetail(prevDetail => prevDetail ? { ...prevDetail, [name]: value } : null);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`https://bl924snd-3000.asse.devtunnels.ms/cinema`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cinemaDetail),
      });
      if (!response.ok) {
        throw new Error('Failed to save changes');
      }
      console.log('Changes saved:', cinemaDetail);
      navigate('/cinema');
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  const handleDeleteCinema = async () => {
    setShowModal(true); 
  };

  const confirmDeleteCinema = async () => {
    try {
      const response = await fetch(`https://bl924snd-3000.asse.devtunnels.ms/admin/cinema/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete cinema');
      }
      console.log('Cinema deleted');
      navigate('/cinema');
    } catch (error) {
      console.error('Error deleting cinema:', error);
    } finally {
      setShowModal(false); 
    }
  };

  const closeModal = () => {
    setShowModal(false); 
  };

  if (loading) {
    return <div>Loading cinema details...</div>;
  }

  if (!cinemaDetail) {
    return <div>Error fetching cinema details</div>;
  }

  return (
    <>
      <Breadcrumb pageName="Cinema Detail" />

      {/* Modal xác nhận */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto max-w-sm mx-auto my-6">
            <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              {/* Header */}
              <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-stroke dark:border-strokedark">
                <h3 className="text-lg font-semibold">
                  Are you sure you want to delete this cinema?
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={closeModal}
                >
                  <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/* Body */}
              <div className="relative p-6 flex-auto">
                {/* Content */}
                <p className="my-4 text-gray-600 text-lg leading-relaxed">
                  This action cannot be undone.
                </p>
              </div>
              {/* Footer */}
              <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-stroke dark:border-strokedark">
                <button
                  className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  style={{ transition: 'all .15s ease' }}
                  onClick={confirmDeleteCinema}
                >
                  Delete
                </button>
                <button
                  className="bg-gray-300 text-black active:bg-gray-400 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  style={{ transition: 'all .15s ease' }}
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Nội dung chi tiết rạp */}
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9 py-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-2 px-6.5 dark:border-strokedark">
              {/* Tiêu đề */}
              <h2 className="text-2xl font-extrabold">Cinema Details</h2>
            </div>
            {/* Thông tin rạp chiếu phim */}
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white font-extrabold">
                  Cinema Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={cinemaDetail?.name || ''}
                  required
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white font-extrabold">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={cinemaDetail?.address || ''}
                  required
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white font-extrabold">
                  Province/City ID
                </label>
                <input
                  type="text"
                  name="provinceCity"
                  required
                  value={cinemaDetail?.provinceCity.toString() || ''}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  onChange={handleInputChange}
                />
              </div>

              {/* Nút lưu thay đổi */}
              <button
                className="mt-4 px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
              {/* Nút xóa rạp */}
              <button
                className="mt-4 px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
                onClick={handleDeleteCinema}
                style={{ alignSelf: 'flex-end' }}
              >
                Delete Cinema
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Danh sách màn hình */}
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-extrabold">Screens</div>
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
