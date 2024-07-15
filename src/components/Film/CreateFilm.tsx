import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-toastify'
import { createFilm } from '../../apis/film'
import { useNavigate } from 'react-router-dom'
import Breadcrumb from '../Breadcrumbs/Breadcrumb'
import { film } from '../../types/film'
import { WidgetLoader, Widget } from 'react-cloudinary-upload-widget'

const cloudname = 'dsnqfhnyx'

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
      console.log('Done! Here is the image info: ', result.info)
      setPoster(result.info.url)
    }
  }

  const onSubmit = async (data: film) => {
    try {
      await createFilm({ ...data, poster })
      navigate('/film')
    } catch (error) {
      toast.error('Failed to create film')
    }
  }

  const openWidget = () => {
    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'dsnqfhnyx',
        uploadPreset: 'vanlanhdh',
        sources: ['local', 'url'],
        multiple: false,
        cropping: false,
        folder: 'film_posters',
        resourceType: 'image'
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          handleUploadSuccess(result)
        }
      }
    )
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
                <label className='mb-3 block font-extrabold text-black dark:text-white'>Film Title</label>
                <input
                  type='text'
                  {...register('filmName', { required: 'Film title is required' })}
                  className='w-full rounded-md border border-stone-500 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-primary dark:text-white'
                />
                {errors.filmName && <p className='text-red-500'>{errors.filmName.message}</p>}
              </h2>
            </div>
            <div className='grid grid-cols-2 gap-5.5 p-6.5'>
              <div>
                <label className='mb-3 block font-extrabold text-black dark:text-white'>Duration</label>
                <input
                  type='number'
                  {...register('duration', { required: 'Duration is required' })}
                  className='w-full rounded-md border border-stone-500 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-primary dark:text-white'
                />
                {errors.duration && <p className='text-red-500'>{errors.duration.message}</p>}
              </div>
              <div>
                <label className='mb-3 block font-extrabold text-black dark:text-white'>Category</label>
                <input
                  type='text'
                  {...register('category', { required: 'Category is required' })}
                  className='w-full rounded-md border border-stone-500 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-primary dark:text-white'
                />
                {errors.category && <p className='text-red-500'>{errors.category.message}</p>}
              </div>
              <div>
                <label className='mb-3 block font-extrabold text-black dark:text-white'>Date Start</label>
                <input
                  type='date'
                  {...register('dateStart', { required: 'Date start is required' })}
                  className='w-full rounded-md border border-stone-500 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-primary dark:text-white'
                />
                {errors.dateStart && <p className='text-red-500'>{errors.dateStart.message}</p>}
              </div>
              <div>
                <label className='mb-3 block font-extrabold text-black dark:text-white'>Date End</label>
                <input
                  type='date'
                  {...register('dateEnd', { required: 'Date end is required' })}
                  className='w-full rounded-md border border-stone-500 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-primary dark:text-white'
                />
                {errors.dateEnd && <p className='text-red-500'>{errors.dateEnd.message}</p>}
              </div>
              <div>
                <label className='mb-3 block font-extrabold text-black dark:text-white'>Director</label>
                <input
                  type='text'
                  {...register('director', { required: 'Director is required' })}
                  className='w-full rounded-md border border-stone-500 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-primary dark:text-white'
                />
                {errors.director && <p className='text-red-500'>{errors.director.message}</p>}
              </div>
              <div>
                <label className='mb-3 block font-extrabold text-black dark:text-white'>Actor</label>
                <input
                  type='text'
                  {...register('actor', { required: 'Actor is required' })}
                  className='w-full rounded-md border border-stone-500 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-primary dark:text-white'
                />
                {errors.actor && <p className='text-red-500'>{errors.actor.message}</p>}
              </div>
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
              <div>
                <label className='mb-3 block font-extrabold text-black dark:text-white'>Format</label>
                <input
                  type='text'
                  {...register('format', { required: 'Format is required' })}
                  className='w-full rounded-md border border-stone-500 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-primary dark:text-white'
                />
                {errors.format && <p className='text-red-500'>{errors.format.message}</p>}
              </div>
              <div>
                <label className='mb-3 block font-extrabold text-black dark:text-white'>Age Rate</label>
                <input
                  type='text'
                  {...register('ageRate', { required: 'Age rate is required' })}
                  className='w-full rounded-md border border-stone-500 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-primary dark:text-white'
                />
                {errors.ageRate && <p className='text-red-500'>{errors.ageRate.message}</p>}
              </div>
              <div className='col-span-2'>
                <label className='mb-3 block font-extrabold text-black dark:text-white'>Description</label>
                <textarea
                  {...register('description', { required: 'Description is required' })}
                  className='w-full rounded-md border border-stone-500 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-primary dark:text-white'
                />
                {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
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
