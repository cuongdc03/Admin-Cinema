import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import moment from 'moment'
import { getShowsbyquery } from '../../apis/show'
import { DataGrid } from '@mui/x-data-grid'
import { getCinemas } from '../../apis/cinema'
import { toast } from 'react-toastify'
import { DATA_GRID_COLUMNS, DATA_GRID_SETTINGS } from './dataGridConstant'
import ShowModal from './ShowModal'
import { getfilms } from '../../apis/film'
import { CinemaType } from '../../types/cinema'
import { FilmType } from '../../types/film'
import { ShowType } from '../../types/show'
import { ScreenType } from '../../types/screen'

const Show: React.FC = () => {
  const [cinemas, setCinemas] = useState<CinemaType[]>([])
  const [films, setFilms] = useState<FilmType[]>([])
  const [selectedCinema, setSelectedCinema] = useState<CinemaType | null>(null)
  const [selectedScreen, setSelectedScreen] = useState<ScreenType | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().slice(0, 10))
  const [shows, setShows] = useState<ShowType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const fetchCinemas = async () => {
    try {
      const response = await getCinemas()
      setCinemas(response)
    } catch (error) {
      toast.error('Failed to fetch cinemas')
    }
  }

  const fetchFilms = async () => {
    try {
      const response = await getfilms()
      setFilms(response)
    } catch (error) {
      toast.error('Failed to fetch films')
    }
  }

  useEffect(() => {
    fetchCinemas()
    fetchFilms()
  }, [])

  const handleCinemaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedCinemaId = parseInt(event.target.value, 10)
    const foundCinema = cinemas.find((cinema) => cinema.id === selectedCinemaId)
    setSelectedCinema(foundCinema || null)
    setSelectedScreen(null)
  }

  const handleScreenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedScreenId = parseInt(event.target.value, 10)
    const foundScreen = selectedCinema?.screens?.find((s) => s.id === selectedScreenId) || null
    setSelectedScreen(foundScreen)
  }

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value)
  }

  const handleSearch = async () => {
    setIsLoading(true)
    try {
      const formattedDate = moment(selectedDate).format('YYYY-MM-DD')
      let showsData: ShowType[] = []

      if (selectedCinema && selectedScreen) {
        showsData = await getShowsbyquery(formattedDate, selectedCinema.id.toString(), selectedScreen.id.toString())
      } else if (selectedCinema) {
        showsData = await getShowsbyquery(formattedDate, selectedCinema.id.toString(), '')
      } else {
        showsData = await getShowsbyquery(formattedDate, '', '')
      }

      showsData = showsData.map((show) => ({
        ...show,
        timeStart: moment(show.timeStart, 'HH:mm:ss').format('HH:mm:ss')
      }))

      setShows(showsData)
    } catch (error) {
      toast.error('Failed to fetch shows')
      setShows([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateShow = () => {
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const handleSave = () => {
    closeModal()
  }

  return (
    <div className='container mx-auto p-4'>
      <div className='mb-4 flex items-center space-x-4 text-black dark:text-white'>
        <TextField
          id='cinema-select'
          select
          label='Cinema'
          value={selectedCinema?.id || ''}
          onChange={handleCinemaChange}
          className='w-56 rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
        >
          <MenuItem value=''>
            <em>Select a Cinema</em>
          </MenuItem>
          {cinemas &&
            cinemas.length > 0 &&
            cinemas.map((cinema) => (
              <MenuItem key={cinema.id} value={cinema.id}>
                {cinema.name}
              </MenuItem>
            ))}
        </TextField>
        <TextField
          id='screen-select'
          select
          label='Screen'
          value={selectedScreen ? selectedScreen.id.toString() : ''}
          onChange={handleScreenChange}
          className='w-56'
          disabled={!selectedCinema}
        >
          <MenuItem value=''>
            <em>Select a Screen</em>
          </MenuItem>
          {selectedCinema?.screens?.map((screen) => (
            <MenuItem key={screen.id} value={screen.id}>
              {screen.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id='date'
          label='Date'
          type='date'
          value={selectedDate}
          onChange={handleDateChange}
          className='w-56'
          InputLabelProps={{
            shrink: true
          }}
        />
        <button className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700' onClick={handleSearch}>
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>
      {shows && shows.length > 0 && (
        <div className='flex flex-col space-y-4'>
          {shows.map((cinema) => (
            <div key={cinema.id}>
              <h2 className='mb-2 rounded bg-blue-500 py-2 text-center text-xl  font-bold text-white'>{cinema.name}</h2>
              {cinema.screens.map((screen) => (
                <div key={screen.id}>
                  <h3 className='text-md mb-1 font-semibold text-purple-500'>{screen.name}</h3>
                  <DataGrid
                    rows={screen.shows.map((show) => ({
                      id: show.id,
                      filmName: show.film.filmName,
                      timeStart: show.timeStart,
                      price: show.price,
                      filmId: show.filmId
                    }))}
                    columns={DATA_GRID_COLUMNS}
                    {...DATA_GRID_SETTINGS}
                  />
                  <div className='py-2'>
                    <button
                      className='mr-2 rounded bg-blue-500 px-2 py-2 font-bold text-white hover:bg-blue-700'
                      onClick={handleCreateShow}
                    >
                      Create Show
                    </button>
                    {showModal && (
                      <ShowModal
                        cinema={cinema}
                        screen={screen}
                        selectedDate={selectedDate}
                        onClose={closeModal}
                        onSave={handleSave}
                        films={films}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Show
