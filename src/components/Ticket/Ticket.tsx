import React, { useState, useEffect } from 'react'
import Breadcrumb from '../Breadcrumbs/Breadcrumb'
import { getTickets } from '@/apis/ticket'
import Table from '../Table'
import { TicketType } from '@/types/ticket'

const Ticket: React.FC = () => {
    const [tickets, setTickets] = useState<TicketType[] | null>(null)
    const fetchTickets = async () => {
        const response = await getTickets()
        setTickets(response)
    }
  useEffect(() => {
    fetchTickets()
  }, [])
  const displayedColumns: (keyof TicketType)[] = ['id', 'clientName', 'phone', 'price', 'isPaid']
  return (
    <div>
      <Breadcrumb pageName='Cinema' />
      <Table 
        rows={tickets}
        displayedColumns={displayedColumns}
        />
    </div>
  )
}

export default Ticket