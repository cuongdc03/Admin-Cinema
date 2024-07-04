import { customFetch, showError } from '../util/http'
import { cinema } from '../types/cinema'
import { CINEMA_URL, ADMIN_CINAME_URL } from './constant'

export const getCinemas = async (): Promise<cinema[]> => {
  return await customFetch.get(CINEMA_URL, { signalKey: 'getCinemas' }).catch(showError)
}

export const getCinema = async (id: number): Promise<cinema> => {
  return await customFetch.get(`${CINEMA_URL}/?id=${id}`, { signalKey: 'getCinema' }).catch(showError)
}

export const createCinema = async (data: cinema): Promise<cinema> => {
  return await customFetch
    .post(ADMIN_CINAME_URL, {
      body: data,
      signalKey: 'createCinema'
    })
    .catch(showError)
}

export const updateCinema = async (cinema: cinema): Promise<any> => {
  return await customFetch
    .put(ADMIN_CINAME_URL, {
      body: cinema,
      signalKey: 'updateCinema'
    })
    .catch(showError)
}
export const deleteCinema = async (
  id: number,
  setCinemas: React.Dispatch<React.SetStateAction<cinema[]>>
): Promise<void> => {
  try {
    const response = await customFetch.delete(`/cinema/${id}`, {
      signalKey: 'deleteCinema'
    })
    setCinemas((prevCinemas) => prevCinemas.filter((c) => c.id !== id))
  } catch (error) {
    showError(error)
  }
}
