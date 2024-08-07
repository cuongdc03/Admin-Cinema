import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-toastify'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import { Moment } from 'moment'
import { CinemaType } from '../../types/cinema'
import { FilmType } from '../../types/film'
import { ScreenType } from '../../types/screen'
import { postShow } from '../../apis/show'
import { formatPrice } from './dataGridConstant'

interface ShowModalProps {
  cinemas: CinemaType[]
  cinema?: CinemaType | null
  screen?: ScreenType | null
  selectedDate: string
  films: FilmType[]
  onClose: () => void
  onSave: () => void
}

const ShowModal: React.FC<ShowModalProps> = ({ cinema, screen, selectedDate, films, cinemas, onClose, onSave }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm({
    defaultValues: {
      cinema: cinema?.id || '',
      screen: screen?.id || '',
      film: '',
      price: '',
      time: null as Moment | null
    }
  })

  const [availableScreens, setAvailableScreens] = useState<ScreenType[]>([])

  const watchCinema = watch('cinema')

  useEffect(() => {
    const selectedCinema = cinemas.find((c) => c.id === watchCinema)
    setAvailableScreens(selectedCinema ? selectedCinema.screens : [])
    setValue('screen', '')
  }, [watchCinema, cinemas, setValue])

  const prices = [50000, 75000, 100000]
  const onSubmit = async (data: any) => {
    const cinemaId = watch('cinema') || cinema?.id
    const screenId = watch('screen') || screen?.id
    if (data.time && cinemaId && screenId && data.film && data.price) {
      const showData = {
        cinemaId: watch('cinema') || cinema?.id,
        screenId: watch('screen') || screen?.id,
        dateStart: selectedDate,
        filmId: Number(data.film),
        price: data.price,
        timeStart: data.time.format('HH:mm')
      }
      try {
        await postShow(showData)
        onSave()
      } catch (error) {
        toast.error('Failed to create show')
      }
    } else {
      toast.error('Please fill in all required fields.')
    }
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50' onClick={onClose}>
      <div className='relative w-1/3 rounded-lg bg-white p-6 shadow-lg' onClick={(e) => e.stopPropagation()}>
        <h2 className='mb-4 text-lg font-bold'>Create Show</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            {cinema && screen ? (
              <>
                <TextField label='Cinema' value={cinema.name} fullWidth disabled />
                <div className='mb-4' />
                <TextField label='Screen' value={screen.name} fullWidth disabled />
              </>
            ) : (
              <>
                <div className='mb-4'>
                  <Controller
                    name='cinema'
                    control={control}
                    rules={{ required: 'Cinema is required' }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        select
                        label='Cinema'
                        fullWidth
                        error={!!errors.cinema}
                        helperText={errors.cinema ? errors.cinema.message : ''}
                      >
                        <MenuItem value=''>
                          <em>Select a Cinema</em>
                        </MenuItem>
                        {cinemas.map((cinema) => (
                          <MenuItem key={cinema.id} value={cinema.id}>
                            {cinema.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </div>

                <div className='mb-4'>
                  <Controller
                    name='screen'
                    control={control}
                    rules={{ required: 'Screen is required' }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        select
                        label='Screen'
                        fullWidth
                        error={!!errors.screen}
                        helperText={errors.screen ? errors.screen.message : ''}
                        disabled={!watchCinema}
                      >
                        <MenuItem value=''>
                          <em>Select a Screen</em>
                        </MenuItem>
                        {availableScreens
                          .filter((screen) => screen.status)
                          .map((screen) => (
                            <MenuItem key={screen.id} value={screen.id}>
                              {screen.name}
                            </MenuItem>
                          ))}
                      </TextField>
                    )}
                  />
                </div>
              </>
            )}
          </div>

          <div className='mb-4'>
            <TextField id='date' label='Date' value={selectedDate} fullWidth disabled />
          </div>

          <div className='mb-4'>
            <Controller
              name='film'
              control={control}
              rules={{ required: 'Film is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  id='film'
                  select
                  label='Film'
                  fullWidth
                  error={!!errors.film}
                  helperText={errors.film ? errors.film.message : ''}
                >
                  <MenuItem value=''>Select a Film</MenuItem>
                  {films.map((film) => (
                    <MenuItem key={film.id} value={film.id}>
                      {film.title}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </div>

          <div className='mb-4'>
            <Controller
              name='price'
              control={control}
              rules={{ required: 'Price is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  id='price'
                  select
                  label='Price'
                  fullWidth
                  error={!!errors.price}
                  helperText={errors.price ? errors.price.message : ''}
                >
                  <MenuItem value=''>Select a Price</MenuItem>
                  {prices.map((price) => (
                    <MenuItem key={price} value={price}>
                      {formatPrice(price)}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </div>

          <div className='mb-4'>
            <Controller
              name='time'
              control={control}
              rules={{ required: 'Show Time is required' }}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <TimePicker
                    {...field}
                    label='Show Time'
                    minutesStep={5}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={!!errors.time}
                        helperText={errors.time ? errors.time.message : ''}
                        InputLabelProps={{ shrink: true }}
                      />
                    )}
                  />
                </LocalizationProvider>
              )}
            />
          </div>

          <div className='flex justify-end gap-2'>
            <Button variant='contained' color='error' onClick={onClose} className='mr-2'>
              Cancel
            </Button>
            <Button variant='contained' color='primary' type='submit'>
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ShowModal
