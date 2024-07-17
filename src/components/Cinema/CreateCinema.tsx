import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Breadcrumb from '../Breadcrumbs/Breadcrumb'
import { cinema } from '../../types/cinema'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { provincecity } from '../../types/provincecity'
import { getprovinceCities } from '../../apis/provincecity'
import { createCinema } from '../../apis/cinema'

const CinemaCreate: React.FC = () => {
  const [newCinema, setNewCinema] = useState<cinema>({
    id: 0,
    name: '',
    address: '',
    provinceCity: '',
    provinceCityId: 0,
    status: false,
    screens: []
  })

  const [provinceCities, setProvinceCities] = useState<provincecity[]>([])
  const [error, setError] = useState<string>('')
  const [isFormValid, setIsFormValid] = useState(false)
  const fetchProvinceCities = async () => {
    const provinceCities = await getprovinceCities()
    setProvinceCities(provinceCities)
  }
  useEffect(() => {
    fetchProvinceCities()
  }, [])

  const navigate = useNavigate()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setError('')

    if (name === 'provinceCity') {
      const selectedCity = provinceCities.find((city) => city.name === value)
      setNewCinema((prevCinema) => ({
        ...prevCinema,
        provinceCity: value, // Cập nhật tên provinceCity
        provinceCityId: selectedCity ? selectedCity.id : 0
      }))
    } else {
      setNewCinema((prevCinema) => ({
        ...prevCinema,
        [name]: value
      }))
    }

    setIsFormValid(
      !!newCinema.name && !!newCinema.address && !!newCinema.provinceCityId // Kiểm tra provinceCityId
    )
  }

  const handleSaveChanges = async () => {
    if (!isFormValid) {
      setError('Please fill out all fields.')
      toast.error('Please fill out all fields.')
      return
    }

    try {
      await createCinema(newCinema)
      toast.success('Cinema created successfully!')
      setError('')
      setTimeout(() => {
        navigate('/cinema')
      }, 1000)
    } catch (error: any) {
      toast.error('Error creating cinema: ' + error.message)
    }
  }

  return (
    <>
      <Breadcrumb pageName='Create New Cinema' />
      <div className='grid grid-cols-1 gap-9 sm:grid-cols-2'>
        <div className='flex flex-col gap-9'>
          <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
            <div className='border-b border-stroke px-6.5 py-2 dark:border-strokedark'></div>
            <div className='flex flex-col gap-5.5 p-6.5'>
              <div>
                <label className='mb-3 block font-extrabold text-black dark:text-white'>
                  Cinema Name <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  name='name'
                  value={newCinema.name}
                  onChange={handleChange}
                  className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                />
              </div>
              <div>
                <label className='mb-3 block font-extrabold text-black dark:text-white'>
                  Address <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  name='address'
                  value={newCinema.address}
                  onChange={handleChange}
                  className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                />
              </div>
              <div>
                <label className='mb-3 block font-extrabold text-black dark:text-white'>
                  Province/City <span className='text-red-500'>*</span>
                </label>
                <select
                  name='provinceCity'
                  value={newCinema.provinceCity}
                  onChange={handleChange}
                  className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                >
                  <option value='' disabled>
                    Select Province/City
                  </option>
                  {provinceCities &&
                    provinceCities.length > 0 &&
                    provinceCities.map((city) => (
                      <option key={city.id} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                </select>
              </div>

              <button
                className='hover:bg-primary-dark mt-4 rounded-lg bg-primary px-4 py-2 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-primary'
                onClick={handleSaveChanges}
                disabled={!isFormValid}
              >
                Save Cinema
              </button>

              {error && <div className='text-red-500'>{error}</div>}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CinemaCreate
