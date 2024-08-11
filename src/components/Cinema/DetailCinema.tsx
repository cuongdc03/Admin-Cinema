import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Breadcrumb from '../Breadcrumbs/Breadcrumb'
import { getCinema, updateCinema } from '@/apis/cinema'
import Input from '../InputComponent/Input'
import MapComponent from '../MapComponent/MapComponent'
import { path } from '@/router/path'
import ScreenList from './ScreenList'
import { CinemaType } from '@/types/cinema'
import { getProvinceCities } from '@/apis/provinceCity'

const CinemaDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [loading, setLoading] = useState(true)
  const [provinceCities, setProvinceCities] = useState<{ id: number; name: string }[]>([])
  const [mapLoaded, setMapLoaded] = useState(false)
  const navigate = useNavigate()
  const methods = useForm<CinemaType>()
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors }
  } = methods

  const fetchCinemaDetail = async () => {
    try {
      const response = await getCinema(Number(id))
      reset(response)
    } catch (error) {
      toast.error('Failed to fetch cinema details')
    }
  }

  const fetchProvinceCities = async () => {
    try {
      const provinceCities = await getProvinceCities()
      const data = provinceCities.map((city) => ({
        id: city.id,
        name: city.name
      }))
      setProvinceCities(data)
    } catch (error) {}
  }

  const fetchData = async () => {
    await Promise.all([fetchCinemaDetail(), fetchProvinceCities()])
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [id, setValue])

  const onSubmit: SubmitHandler<CinemaType> = async (data) => {
    try {
      await updateCinema(data)
      navigate(path.cinema)
    } catch (error) {
      toast.error('Failed to save changes')
    }
  }

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'provinceCity') {
        const selectedCity = provinceCities.find((city) => city.name === value.provinceCity?.name)
        setValue('provinceCity.id', selectedCity ? selectedCity.id : 0)
      }
    })
    return () => subscription.unsubscribe()
  }, [watch, provinceCities, setValue])

  const address = watch('address')
  const provinceCity = watch('provinceCity')
  const cinemaId = watch('id')
  const screens = watch('screens') || []

  useEffect(() => {
    if (address && provinceCity) {
      setMapLoaded(true)
    }
  }, [address, provinceCity])

  if (loading) {
    return <div>Loading cinema details...</div>
  }

  return (
    <>
      <Breadcrumb pageName='Cinema Detail' />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 gap-9 sm:grid-cols-2'>
          <div className='flex flex-col gap-9 py-9'>
            <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
              <div className='border-b border-stroke px-6.5 py-2 dark:border-strokedark'>
                <h2 className='text-2xl font-extrabold'>Cinema Details</h2>
              </div>
              <div className='flex flex-col gap-5.5 p-6.5'>
                <Input
                  label='Cinema Name'
                  type='text'
                  register={register('name', { required: 'Cinema name is required' })}
                  error={errors.name?.message}
                />
                <Input
                  label='Address'
                  type='text'
                  register={register('address', { required: 'Address is required' })}
                  error={errors.address?.message}
                />
                <div>
                  <label className='mb-3 block font-extrabold text-black dark:text-white'>
                    Province/City
                    <span className='px-1 text-red-600'>*</span>
                  </label>
                  <select
                    {...register('provinceCity.name', { required: 'Province/City is required' })}
                    className='w-full rounded-lg border-[1.5px] border-graydark bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                  >
                    <option value='' disabled>
                      Select Province/City
                    </option>
                    {provinceCities.map((city) => (
                      <option key={city.id} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                  {errors.provinceCity && <span className='text-red-500'>{errors.provinceCity.message}</span>}
                </div>
                <button
                  className='hover:bg-primary-dark mt-4 rounded-lg bg-primary px-4 py-2 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-primary'
                  type='submit'
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-9 py-9'>
            <div className='rounded-sm'>
              <div className='px-6.5'>
                {mapLoaded && <MapComponent address={address} provinceCity={provinceCity.name} />}
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
      <ScreenList cinemaId={cinemaId} screens={screens.filter((screen) => screen.status)} />
    </>
  )
}

export default CinemaDetail
