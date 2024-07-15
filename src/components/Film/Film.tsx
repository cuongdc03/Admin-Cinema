import { useEffect, useState } from 'react'
import { film } from '../../types/film'
import { getfilms } from '../../apis/film'
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
  const displayedColumns: (keyof film)[] = ['id', 'filmName', 'director', 'category', 'status']

  return (
    <div>
      <Breadcrumb pageName='Cinema' />
      <Table rows={films} displayedColumns={displayedColumns} onDelete onStatusChange isCinema={false} />
    </div>
  )
}
export default Film
