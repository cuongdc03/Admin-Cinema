import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import Breadcrumb from '../Breadcrumbs/Breadcrumb'
import { getFilm, updateFilm } from '../../apis/film'
import { WidgetLoader } from 'react-cloudinary-upload-widget'
import Input from '../InputComponent/Input'
import { CLOUDINARY_OPTIONS, LANGUAGES_LIST, FORMATS_LIST, AGE_RATE_LIST, CATEGORIES_LIST } from './constant'
import { FilmType } from '@/types/film'

const FilmDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    register,
    watch,
    formState: { isValid, errors }
  } = useForm<FilmType>({ mode: 'onChange' })
  const navigate = useNavigate()
  const filmDetail = watch()

  const fetchFilmDetail = async () => {
    const response = await getFilm(Number(id))
    reset(response)
  }

  useEffect(() => {
    fetchFilmDetail()
  }, [id])

  const handleSaveChanges = async (data: FilmType) => {
    await updateFilm(data)
    navigate('/film')
  }

  const handleFileUploadSuccess = (result: any) => {
    if (result.event === 'success') {
      setValue('poster', result.info.url)
    }
  }

  const openWidget = () => {
    const myWidget = window.cloudinary.createUploadWidget(CLOUDINARY_OPTIONS, (error, result) => {
      if (!error && result && result.event === 'success') {
        handleFileUploadSuccess(result)
      }
    })
    myWidget.open()
  }

  return (
    <>
      <Breadcrumb pageName='Film Detail' />
      <form onSubmit={handleSubmit(handleSaveChanges)} className='grid grid-cols-3 gap-9'>
        <div className='col-span-2 flex flex-col gap-9 py-9'>
          <div className='rounded-sm border border-stroke shadow-default dark:border-strokedark'>
            <div className='border-b border-stroke px-6.5 py-2 dark:border-strokedark'>
              <h2 className='text-2xl font-semibold text-black dark:text-white'>
                <Controller
                  name='filmName'
                  control={control}
                  rules={{ required: 'Film Name is required' }}
                  render={({ field }) => (
                    <Input
                      label='Film Name'
                      type='text'
                      register={register('filmName', { required: 'Film Name is required' })}
                      error={errors.filmName?.message}
                      {...field}
                    />
                  )}
                />
              </h2>
            </div>
            <div className='grid grid-cols-2 gap-5.5 p-6.5'>
              <Controller
                name='language'
                control={control}
                rules={{ required: 'Language is required' }}
                render={({ field }) => (
                  <div>
                    <label className='mb-3 block font-extrabold text-black dark:text-white'>Language</label>
                    <select
                      {...register('language', { required: 'Language is required' })}
                      className='w-full rounded-lg border border-stroke px-3 py-2'
                      {...field}
                    >
                      {LANGUAGES_LIST.map((lang) => (
                        <option key={lang} value={lang}>
                          {lang}
                        </option>
                      ))}
                    </select>
                    {errors.language && <p className='text-red-500'>{errors.language.message}</p>}
                  </div>
                )}
              />
              <Controller
                name='category'
                control={control}
                rules={{ required: 'Category is required' }}
                render={({ field }) => (
                  <div>
                    <label className='mb-3 block font-extrabold text-black dark:text-white'>Category</label>
                    <select
                      {...register('category', { required: 'Category is required' })}
                      className='w-full rounded-lg border border-stroke px-3 py-2'
                      {...field}
                    >
                      {CATEGORIES_LIST.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    {errors.category && <p className='text-red-500'>{errors.category.message}</p>}
                  </div>
                )}
              />
              <Controller
                name='format'
                control={control}
                rules={{ required: 'Format is required' }}
                render={({ field }) => (
                  <div>
                    <label className='mb-3 block font-extrabold text-black dark:text-white'>Format</label>
                    <select
                      {...register('format', { required: 'Format is required' })}
                      className='w-full rounded-lg border border-stroke px-3 py-2'
                      {...field}
                    >
                      {FORMATS_LIST.map((format) => (
                        <option key={format} value={format}>
                          {format}
                        </option>
                      ))}
                    </select>
                    {errors.format && <p className='text-red-500'>{errors.format.message}</p>}
                  </div>
                )}
              />
              <Controller
                name='ageRate'
                control={control}
                rules={{ required: 'Age Rate is required' }}
                render={({ field }) => (
                  <div>
                    <label className='mb-3 block font-extrabold text-black dark:text-white'>Age Rate</label>
                    <select
                      {...register('ageRate', { required: 'Age Rate is required' })}
                      className='w-full rounded-lg border border-stroke px-3 py-2'
                      {...field}
                    >
                      {AGE_RATE_LIST.map((ageRate) => (
                        <option key={ageRate} value={ageRate}>
                          {ageRate}
                        </option>
                      ))}
                    </select>
                    {errors.ageRate && <p className='text-red-500'>{errors.ageRate.message}</p>}
                  </div>
                )}
              />
              <Controller
                name='dateStart'
                control={control}
                rules={{ required: 'Start Date is required' }}
                render={({ field }) => (
                  <Input
                    label='Date Start'
                    type='date'
                    register={register('dateStart', { required: 'Start Date is required' })}
                    error={errors.dateStart?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                name='dateEnd'
                control={control}
                rules={{ required: 'End Date is required' }}
                render={({ field }) => (
                  <Input
                    label='Date End'
                    type='date'
                    register={register('dateEnd', { required: 'End Date is required' })}
                    error={errors.dateEnd?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                name='director'
                control={control}
                rules={{ required: 'Director is required' }}
                render={({ field }) => (
                  <Input
                    label='Director'
                    type='text'
                    register={register('director', { required: 'Director is required' })}
                    error={errors.director?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                name='actor'
                control={control}
                rules={{ required: 'Actor is required' }}
                render={({ field }) => (
                  <Input
                    label='Actor'
                    type='text'
                    register={register('actor', { required: 'Actor is required' })}
                    error={errors.actor?.message}
                    {...field}
                  />
                )}
              />
              <div>
                <label className='mb-3 block font-extrabold text-black dark:text-white'>Subtitle</label>
                <Controller
                  name='subtitle'
                  control={control}
                  render={({ field }) => (
                    <input
                      type='checkbox'
                      {...register('subtitle')}
                      className='bg-gray-100 border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 h-4 w-4 rounded border text-blue-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600'
                      {...field}
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
                      {...register('dubbing')}
                      className='bg-gray-100 border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 h-4 w-4 rounded border text-blue-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600'
                      {...field}
                    />
                  )}
                />
              </div>
              <Controller
                name='duration'
                control={control}
                rules={{ required: 'Duration is required' }}
                render={({ field }) => (
                  <Input
                    label='Duration'
                    type='number'
                    register={register('duration', { required: 'Duration is required' })}
                    error={errors.duration?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                name='trailer'
                control={control}
                rules={{ required: 'Trailer is required' }}
                render={({ field }) => (
                  <Input
                    label='Trailer'
                    type='text'
                    register={register('trailer', { required: 'Trailer is required' })}
                    error={errors.trailer?.message}
                    {...field}
                  />
                )}
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
                  disabled={!isValid}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='col-span-1 flex w-full flex-col items-center py-9'>
          <div className='flex w-full flex-col items-center rounded-lg border border-stroke shadow-default dark:border-strokedark'>
            <img src={filmDetail.poster || 'https://via.placeholder.com/400x600'} className='mt-2 w-full rounded-lg' />
            <WidgetLoader />
            <div className='flex w-full flex-col items-center rounded-lg border border-stroke shadow-default dark:border-strokedark'>
              <button
                onClick={openWidget}
                type='button'
                className='mb-4 mt-4 justify-center rounded-lg bg-blue-500 px-4 py-2 text-white shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                Upload Poster
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default FilmDetail
