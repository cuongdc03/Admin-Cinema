import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { cinema } from '../../types/cinema'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Breadcrumb from '../Breadcrumbs/Breadcrumb'
import { getCinema, updateCinema } from '../../apis/cinema'
import MapComponent from '../MapComponent/MapComponent'
import { getprovinceCities } from '../../apis/provincecity'
import ScreenList from './ScreenList'

const CinemaDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [cinemaDetail, setCinemaDetail] = useState<cinema | null>(null)
  const [provinceCities, setProvinceCities] = useState<{ id: number; name: string }[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // Store the selected provinceCityId
  const [selectedProvinceCityId, setSelectedProvinceCityId] = useState<number | null>(null)

  useEffect(() => {
    const fetchCinemaDetail = async () => {
      try {
        const response = await getCinema(Number(id)) // Convert id to number
        setCinemaDetail(response)
        setSelectedProvinceCityId(response.provinceCityId)
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }

    const fetchProvinceCities = async () => {
      try {
        const provinceCities = await getprovinceCities()
        const data = provinceCities.map((city) => ({
          id: city.id,
          name: city.name
        }))
        setProvinceCities(data)
      } catch (error) {}
    }

    fetchCinemaDetail()
    fetchProvinceCities()
  }, [id])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    if (name === 'provinceCity') {
      const selectedCity = provinceCities.find((city) => city.name === value)
      if (selectedCity) {
        setSelectedProvinceCityId(selectedCity.id)
      }
    } else {
      setCinemaDetail((prevDetail) => (prevDetail ? { ...prevDetail, [name]: value } : null))
    }
  }

  const handleSaveChanges = async () => {
    try {
      if (!cinemaDetail || !selectedProvinceCityId) {
        throw new Error('Cinema details or province/city not found')
      }
      await updateCinema({
        id: cinemaDetail.id,
        name: cinemaDetail.name,
        address: cinemaDetail.address,
        provinceCityId: selectedProvinceCityId
      })
      navigate('/cinema')
    } catch (error) {
      toast.error('Failed to save changes')
    }
  }
  if (loading) {
    return <div>Loading cinema details...</div>
  }

  if (!cinemaDetail) {
    return <div>Error fetching cinema details</div>
  }
    return (
    <>
      <Breadcrumb pageName='Cinema Detail' />
      <div className='grid grid-cols-1 gap-9 sm:grid-cols-2'>
        <div className='flex flex-col gap-9 py-9'>
          <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
            <div className='border-b border-stroke px-6.5 py-2 dark:border-strokedark'>
              <h2 className='text-2xl font-extrabold'>Cinema Details</h2>
            </div>
            <div className='flex flex-col gap-5.5 p-6.5'>
              <div>
                <label className='mb-3 block font-extrabold text-black dark:text-white'>
                  Cinema Name
                  <span className='px-1 text-red-600'>*</span>
                </label>
                <input
                  type='text'
                  name='name'
                  value={cinemaDetail.name}
                  required
                  className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className='mb-3 block font-extrabold text-black dark:text-white'>
                  Address
                  <span className='px-1 text-red-600'>*</span>
                </label>
                <input
                  type='text'
                  name='address'
                  value={cinemaDetail.address}
                  required
                  className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className='mb-3 block font-extrabold text-black dark:text-white'>
                  Province/City
                  <span className='px-1 text-red-600'>*</span>
                </label>
                <select
                  name='provinceCity'
                  value={provinceCities.find((city) => city.id === selectedProvinceCityId)?.name || ''}
                  required
                  className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                  onChange={handleInputChange}
                >
                  {provinceCities.map((city) => (
                    <option key={city.id} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className='hover:bg-primary-dark mt-4 rounded-lg bg-primary px-4 py-2 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-primary'
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-9 py-9'>
          <div className='rounded-sm'>
            <div className='px-6.5'>
              <MapComponent address={cinemaDetail.address} provinceCity={cinemaDetail.provinceCity} />
            </div>
          </div>
        </div>
      </div>
      <div className='rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark'>
        <div className='mb-4 flex items-center justify-between'>
          <div className='text-lg font-extrabold'>Screens</div>
          <Link
            to='/create'
            className='inline-flex items-center justify-center rounded-md border border-primary px-4 py-2 text-center font-medium text-primary hover:bg-opacity-90 lg:px-4 xl:px-12'
          >
            Create Screen
          </Link>
        </div>
        {cinemaDetail.screens && (
          <ScreenList cinemaId={cinemaDetail.id} screenList={cinemaDetail.screens} onEdit={(screen: any) => {}} />
        )}
      </div>
    </>
  )
}

export default CinemaDetail
