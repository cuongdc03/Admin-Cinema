import { deleteCinema, getCinemas, updateCinema } from '@/apis/cinema'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import Breadcrumb from '../Breadcrumbs/Breadcrumb'
import Table from '../Table'
import { CinemaType } from '@/types/cinema'

const Cinema: React.FC = () => {
  const [cinemas, setCinemas] = useState<CinemaType[]>([])
  const handleDeleteCinema = async (cinema: CinemaType) => {
    try {
      await deleteCinema(cinema.id, setCinemas)
    } catch (error) {
      toast.error('Failed to delete cinema')
    }
  }

  const handleStatusChange = async (cinema: CinemaType) => {
    try {
      await updateCinema(cinema)
    } catch (error) {
      toast.error('Failed to archive cinema')
    }
  }
  const fetchCinemaList = async () => {
    const cinemas = await getCinemas()
    setCinemas(cinemas)
  }

  useEffect(() => {
    fetchCinemaList()
  }, [])
  const displayedColumns: (keyof CinemaType)[] = ['id', 'name', 'address', 'provinceCityName', 'status']
  return (
    <div>
      <Breadcrumb pageName='Cinema' />
      <Table
        rows={cinemas}
        displayedColumns={displayedColumns}
        onDelete={handleDeleteCinema}
        onStatusChange={handleStatusChange}
        isCinema={true}
      />
    </div>
  )
}

export default Cinema
