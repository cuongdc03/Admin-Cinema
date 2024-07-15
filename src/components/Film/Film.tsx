import { useEffect, useState } from 'react'
import { film } from '../../types/film'
import { deleteFilm, getfilms } from '../../apis/film'
import Breadcrumb from '../Breadcrumbs/Breadcrumb'
import Table from '../Table'

const Film: React.FC = () => {
  const [films, setFilms] = useState<film[]>([])

  const fetchFilmList = async () => {
    const response = await getfilms()
    setFilms(response)
  }
  useEffect(() => {
    fetchFilmList()
  }, [])
  const handleDelete = async (film: film) => {
    await deleteFilm(film.id)
  }

  const displayedColumns: (keyof film)[] = ['id', 'filmName', 'director', 'category', 'status']

  return (
    <div>
      <Breadcrumb pageName='Film' />
      <Table rows={films} displayedColumns={displayedColumns} onDelete={handleDelete} onStatusChange isCinema={false} />
    </div>
  )
}
export default Film
