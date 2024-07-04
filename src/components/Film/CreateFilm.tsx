import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-toastify'
import { createFilm } from '../../apis/film'
import { useNavigate } from 'react-router-dom'
import Breadcrumb from '../Breadcrumbs/Breadcrumb'
import { film } from '../../types/film'
import { WidgetLoader } from 'react-cloudinary-upload-widget'
import { CLOUDINARY_OPTIONS, MESSAGES } from './constant'
import Input from '../InputComponent/Input'

const CreateFilm: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<film>()
  const [poster, setPoster] = useState<string>('')
  const navigate = useNavigate()

  const handleUploadSuccess = (result: any) => {
    if (result.event === 'success') {
      setPoster(result.info.url)
    }
  }

  const onSubmit = async (data: film) => {
    try {
      await createFilm({ ...data, poster })
      navigate('/film')
    } catch (error) {
      toast.error(MESSAGES.uploadError)
    }
  }

  const openWidget = () => {
    const myWidget = window.cloudinary.createUploadWidget(CLOUDINARY_OPTIONS, (error, result) => {
      if (!error && result && result.event === 'success') {
        handleUploadSuccess(result)
      }
    })
    myWidget.open()
  }

  return (
    <>
      <Breadcrumb pageName='Create Film' />
      <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-3 gap-9'>
        <div className='col-span-2 flex flex-col gap-9 py-9'>
          <div className='rounded-sm border border-stroke shadow-default dark:border-strokedark'>
            <div className='border-b border-stroke px-6.5 py-2 dark:border-strokedark'>
              <h2 className='text-2xl font-semibold text-black dark:text-white'>
                <Input
                  label='Film Title'
                  type='text'
                  register={register('filmName', { required: 'Film title is required' })}
                  error={errors.filmName?.message}
                />
              </h2>
            </div>
            <div className='grid grid-cols-2 gap-5.5 p-6.5'>
              <Input
                label='Duration'
                type='number'
                register={register('duration', { required: 'Duration is required' })}
                error={errors.duration?.message}
              />
              <Input
                label='Category'
                type='text'
                register={register('category', { required: 'Category is required' })}
                error={errors.category?.message}
              />
              <Input
                label='Date Start'
                type='date'
                register={register('dateStart', { required: 'Date start is required' })}
                error={errors.dateStart?.message}
              />
              <Input
                label='Date End'
                type='date'
                register={register('dateEnd', { required: 'Date end is required' })}
                error={errors.dateEnd?.message}
              />
              <Input
                label='Director'
                type='text'
                register={register('director', { required: 'Director is required' })}
                error={errors.director?.message}
              />
              <Input
                label='Actor'
                type='text'
                register={register('actor', { required: 'Actor is required' })}
                error={errors.actor?.message}
              />
              <div>
                <label className='mb-3 block font-extrabold text-black dark:text-white'>Subtitle</label>
                <Controller
                  name='subtitle'
                  control={control}
                  render={({ field }) => (
                    <input
                      type='checkbox'
                      {...field}
                      className='bg-gray-100 border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 h-4 w-4 rounded border border-stone-500 px-3 py-2 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600'
                    />
                  )}
                />
              </div>
              <div>
                <label className='mb-3 block font-extrabold text-black dark:text-white'>Dubbing</label>
                <Controller
                  name='dubbing'
                  control={control}
                  render={({ field }) => (
                    <input
                      type='checkbox'
                      {...field}
                      className='bg-gray-100 border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 h-4 w-4 rounded border border-stone-500 px-3 py-2 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600'
                    />
                  )}
                />
              </div>
              <Input
                label='Format'
                type='text'
                register={register('format', { required: 'Format is required' })}
                error={errors.format?.message}
              />
              <Input
                label='Age Rate'
                type='text'
                register={register('ageRate', { required: 'Age rate is required' })}
                error={errors.ageRate?.message}
              />
              <div className='col-span-2'>
                <Input
                  label='Description'
                  type='text'
                  register={register('description', { required: 'Description is required' })}
                  error={errors.description?.message}
                />
              </div>
              <div className='col-span-2 flex justify-center'>
                <button
                  type='submit'
                  className='hover:bg-primary-dark mt-4 rounded-lg bg-primary px-16 py-2 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-primary'
                >
                  Create Film
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='col-span-1 w-full py-9'>
          <div className='flex w-full flex-col items-center rounded-lg border border-stroke shadow-default dark:border-strokedark'>
            <img src={poster || 'https://via.placeholder.com/400x600'} className='mt-2 w-full rounded-lg' />
            <WidgetLoader />
            <button
              onClick={openWidget}
              type='button'
              className='mb-4 mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              Choose Picture
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default CreateFilm
