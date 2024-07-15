import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-toastify'
import { createFilm } from '../../apis/film'
import { useNavigate } from 'react-router-dom'
import Breadcrumb from '../Breadcrumbs/Breadcrumb'
import { WidgetLoader } from 'react-cloudinary-upload-widget'
import { CLOUDINARY_OPTIONS, MESSAGES, LANGUAGES_LIST, FORMATS_LIST, AGE_RATE_LIST, CATEGORIES_LIST } from './constant'
import Input from '../InputComponent/Input'
import { Select, MenuItem, FormControl, InputLabel, FormHelperText, Checkbox, FormControlLabel } from '@mui/material'
import { FilmType } from '@/types/film'

const CreateFilm: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FilmType>()
  const [poster, setPoster] = useState<string>('')
  const navigate = useNavigate()

  const handleUploadSuccess = (result: any) => {
    if (result.event === 'success') {
      setPoster(result.info.url)
    }
  }

  const onSubmit = async (data: FilmType) => {
    try {
      const filmData = {
        ...data,
        duration: Number(data.duration),
        poster
      }
      await createFilm(filmData)
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
              <FormControl error={Boolean(errors.language)}>
                <InputLabel>Language</InputLabel>
                <Controller
                  name='language'
                  control={control}
                  defaultValue=''
                  render={({ field }) => (
                    <Select {...field} label='Language'>
                      {LANGUAGES_LIST.map((lang) => (
                        <MenuItem key={lang} value={lang}>
                          {lang}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.language && <FormHelperText>{errors.language.message}</FormHelperText>}
              </FormControl>
              <FormControl error={Boolean(errors.category)}>
                <InputLabel>Category</InputLabel>
                <Controller
                  name='category'
                  control={control}
                  defaultValue=''
                  render={({ field }) => (
                    <Select {...field} label='Category'>
                      {CATEGORIES_LIST.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.category && <FormHelperText>{errors.category.message}</FormHelperText>}
              </FormControl>
              <FormControl error={Boolean(errors.format)}>
                <InputLabel>Format</InputLabel>
                <Controller
                  name='format'
                  control={control}
                  defaultValue=''
                  render={({ field }) => (
                    <Select {...field} label='Format'>
                      {FORMATS_LIST.map((format) => (
                        <MenuItem key={format} value={format}>
                          {format}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.format && <FormHelperText>{errors.format.message}</FormHelperText>}
              </FormControl>
              <FormControl error={Boolean(errors.ageRate)}>
                <InputLabel>Age Rate</InputLabel>
                <Controller
                  name='ageRate'
                  control={control}
                  defaultValue=''
                  render={({ field }) => (
                    <Select {...field} label='Age Rate'>
                      {AGE_RATE_LIST.map((ageRate) => (
                        <MenuItem key={ageRate} value={ageRate}>
                          {ageRate}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.ageRate && <FormHelperText>{errors.ageRate.message}</FormHelperText>}
              </FormControl>
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
              <Input
                label='Duration'
                type='number'
                register={register('duration', { required: 'Duration is required' })}
                error={errors.duration?.message}
              />
              <Input
                label='Trailer'
                type='text'
                register={register('trailer', { required: 'Trailer is required' })}
                error={errors.trailer?.message}
              />
              <div>
                <FormControlLabel
                  control={
                    <Controller name='subtitle' control={control} render={({ field }) => <Checkbox {...field} />} />
                  }
                  label='Subtitle'
                />
              </div>
              <div>
                <FormControlLabel
                  control={
                    <Controller name='dubbing' control={control} render={({ field }) => <Checkbox {...field} />} />
                  }
                  label='Dubbing'
                />
              </div>
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
