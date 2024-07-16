import { deleteCinema, getCinemas, updateCinema } from '@/apis/cinema'
import { cinema } from '@/types/cinema'
import React, { useState, useEffect } from 'react'
import Breadcrumb from '../Breadcrumbs/Breadcrumb'
import Table from '../Table'

const Cinema: React.FC = () => {
  const [cinemas, setCinemas] = useState<cinema[]>([])
  const handleDeleteCinema = async (cinema: cinema) => {
    try {
      await deleteCinema(cinema.id, setCinemas)
    } catch (error) {}
  }

  const handleStatusChange = async (cinema: cinema) => {
    try {
      const updatedCinema = { ...cinema, status: !cinema.status }
      await updateCinema(cinema.id, updatedCinema, setCinemas)
    } catch (error) {}
  }
  const fetchCinemaList = async () => {
    const cinemas = await getCinemas()
    setCinemas(cinemas)
  }

  useEffect(() => {
    fetchCinemaList()
  }, [])
  const displayedColumns: (keyof cinema)[] = ['id', 'name', 'address', 'provinceCityName', 'status']
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
