import { TicketType } from "../types/ticket"
import { customFetch, showError } from "../util/http"
import { ADMIN_TICKET_URL } from "./constant"


export const getTickets = async () : Promise<TicketType[]> => {
    return await customFetch.get(ADMIN_TICKET_URL, { signalKey: 'getTickets' }).catch(showError)
    }