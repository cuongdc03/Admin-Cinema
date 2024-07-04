import { customFetch, showError } from '../util/http'
import { CinemaType } from '../types/cinema'
import { CINEMA_ADMIN_URL } from './constant'

export const getCinemas = async (): Promise<CinemaType[]> => {
  return await customFetch.get(CINEMA_ADMIN_URL, { signalKey: 'getCinemas' }).catch(showError)
}

export const getCinema = async (id: number): Promise<CinemaType> => {
  return await customFetch.get(`${CINEMA_ADMIN_URL}`, { query: { id }, signalKey: 'getCinema' }).catch(showError)
}

export const createCinema = async (data: CinemaType): Promise<CinemaType> => {
  return await customFetch.post(CINEMA_ADMIN_URL, { body: data, signalKey: 'createCinema' }).catch(showError)
}

export const updateCinema = async (data: CinemaType): Promise<CinemaType> => {
  return await customFetch.put(`${CINEMA_ADMIN_URL}`, { body: data, signalKey: 'updateCinema' }).catch(showError)
}

export const deleteCinema = async (
  id: number,
  setCinemas: React.Dispatch<React.SetStateAction<CinemaType[]>>
): Promise<void> => {
  const response = await customFetch.delete(`${CINEMA_ADMIN_URL}`, {
    signalKey: 'deleteCinema'
  })
  setCinemas((prevCinemas) => prevCinemas.filter((c) => c.id !== id))
}
