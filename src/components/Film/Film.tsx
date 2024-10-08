import { useEffect, useState } from 'react'
import { deleteFilm, getFilms } from '../../apis/film'
import Breadcrumb from '../Breadcrumbs/Breadcrumb'
import Table from '../Table'
import { FilmType } from '@/types/film'

const Film: React.FC = () => {
  const [films, setFilms] = useState<FilmType[]>([])

  const fetchFilmList = async () => {
    const response = await getFilms()
    setFilms(response || [])
  }

  useEffect(() => {
    fetchFilmList()
  }, [])

  const handleDelete = async (film: FilmType) => {
    await deleteFilm(film.id)
    fetchFilmList()
  }

  const filteredFilms = (films || []).filter((film) => film.status)

  const displayedColumns: (keyof FilmType)[] = ['id', 'filmName', 'director', 'category', 'status']

  return (
    <div>
      <Breadcrumb pageName='Film' />
      <Table rows={filteredFilms} displayedColumns={displayedColumns} onDelete={handleDelete} isCinema={false} />
    </div>
  )
}

export default Film
