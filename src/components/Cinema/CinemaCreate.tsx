import { createCinema } from '@/apis/cinema'
import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Breadcrumb from '../Breadcrumbs/Breadcrumb'
import Input from '../InputComponent/Input'
import { path } from '@/router/path'
import { CinemaType } from '@/types/cinema'
import { ProvinceCityType } from '@/types/provinceCity'
import { getProvinceCities } from '@/apis/provincecity'

const CinemaCreate: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<CinemaType>()
  const [provinceCities, setProvinceCities] = useState<ProvinceCityType[]>([])
  const navigate = useNavigate()

  const fetchProvinceCities = async () => {
    const fetchedProvinceCities = await getProvinceCities()
    setProvinceCities(fetchedProvinceCities || [])
  }

  useEffect(() => {
    fetchProvinceCities()
  }, [])

  const onSubmit: SubmitHandler<CinemaType> = async (data) => {
    await createCinema(data)
    setTimeout(() => {
      navigate(path.cinema)
    }, 1000)
  }

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'provinceCity.name') {
        const selectedCity = provinceCities.find((city) => city.name === value.provinceCity?.name)
        setValue('provinceCityId', selectedCity?.id)
      }
    })
    return () => subscription.unsubscribe()
  }, [watch, provinceCities, setValue])

  return (
    <>
      <Breadcrumb pageName='Create New Cinema' />
      <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 gap-9 sm:grid-cols-2'>
        <div className='flex flex-col gap-9'>
          <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
            <div className='border-b border-stroke px-6.5 py-2 dark:border-strokedark'></div>
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
                  Province/City <span className='text-red-500'>*</span>
                </label>
                <select
                  {...register('provinceCity.name', { required: 'Province/City is required' })}
                  className='w-full rounded-lg border-[1.5px] border-graydark bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
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
                {errors.provinceCity && <span className='text-red-500'>{errors.provinceCity.message}</span>}
              </div>
              <button
                type='submit'
                className='hover:bg-primary-dark mt-4 rounded-lg bg-primary px-4 py-2 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-primary'
              >
                Save Cinema
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default CinemaCreate
