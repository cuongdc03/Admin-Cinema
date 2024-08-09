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
      await deleteCinema(cinema.id)
      fetchCinemaList()
    } catch (error) {
      toast.error('Failed to delete cinema')
    }
  }

  const fetchCinemaList = async () => {
    const cinemas = await getCinemas()
    setCinemas(cinemas)
  }

  useEffect(() => {
    fetchCinemaList()
  }, [])

  const filteredCinemas = (cinemas || []).filter((cinema) => cinema.status)
  const displayedColumns: (keyof CinemaType)[] = ['id', 'name', 'address', 'provinceCityName', 'status']
  return (
    <div>
      <Breadcrumb pageName='Cinema' />
      <Table
        rows={filteredCinemas}
        displayedColumns={displayedColumns}
        onDelete={handleDeleteCinema}
        onStatusChange={handleDeleteCinema}
        isCinema={true}
      />
    </div>
  )
}

export default Cinema
