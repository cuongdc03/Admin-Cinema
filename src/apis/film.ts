import { film } from '../types/film'
import { customFetch, showError } from '../util/http'
import { ADMIN_FILM_URL, FILM_URL } from './constant'

export const getfilms = async (): Promise<film[]> => {
  return await customFetch.get(FILM_URL, { signalKey: 'getFilms' }).catch(showError)
}
export const deleteFilm = async (id: number): Promise<void> => {
  return await customFetch.delete(`${FILM_URL}/${id}`, { signalKey: 'deleteFilm' }).catch(showError)
}
export const createFilm = async (newFilm: film): Promise<void> => {
  return await customFetch.post(ADMIN_FILM_URL, { body: newFilm, signalKey: 'createFilm' }).catch(showError)
}
