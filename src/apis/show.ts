import { CinemaType } from '../types/cinema'
import { ShowType } from '../types/show'
import { customFetch, showError } from '../util/http'
import { ADMIN_SHOW_URL, SHOW_URL } from './constant'

export const getShows = async (): Promise<ShowType[]> => {
  return await customFetch.get(SHOW_URL, { signalKey: 'getShows' }).catch(showError)
}
export const deleteShow = async (id: number): Promise<void> => {
  return await customFetch.delete(`${ADMIN_SHOW_URL}/${id}`, { signalKey: 'deleteShow' }).catch(showError)
}
export const editShow = async (newShow: ShowType): Promise<void> => {
  return await customFetch.put(ADMIN_SHOW_URL, { body: newShow, signalKey: 'editShow' }).catch(showError)
}
export const getShowsByQuery = async (
  dateStart: string,
  cinemaId?: string,
  screenId?: string
): Promise<CinemaType[]> => {
  const query: any = { dateStart }
  if (cinemaId) query.cinemaId = cinemaId
  if (screenId) query.screenId = screenId

  return await customFetch.get(ADMIN_SHOW_URL, { query, signalKey: 'getShowsbyquery' }).catch(showError)
}

export const postShow = async (newShow: ShowType): Promise<void> => {
  return await customFetch.post(ADMIN_SHOW_URL, { body: newShow, signalKey: 'postShow' }).catch(showError)
}

export const getShowById = async (showId: number): Promise<ShowType> => {
  return await customFetch.get(ADMIN_SHOW_URL, { query: { showId }, signalKey: 'getShowById' }).catch(showError)
}