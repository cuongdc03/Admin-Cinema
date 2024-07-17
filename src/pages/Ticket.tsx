import { TicketType } from "@/types/ticket"
import { useEffect, useState } from "react"
import { getTickets } from "@/apis/ticket"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import Table from "@/components/Table"

const Ticket = () => {
  const [tickets, setTickets] = useState<TicketType[] | null>(null)
  const fetchTickets = async () => {
    const response = await getTickets()
    setTickets(response)
  }
  useEffect(() => {
    fetchTickets()
  }, [])
  const displayedColumns:(keyof TicketType)[] = ['id', 'clientName','phone','price','isPaid']
  return (
    <div>
    <Breadcrumb pageName='Ticket' />
    <Table rows={tickets} displayedColumns={displayedColumns} />
    </div>
  )
}

export default Ticket
