import { FilmType } from '../types/film'
import { customFetch, showError } from '../util/http'
import { ADMIN_FILM_URL, FILM_URL } from './constant'

export const getfilms = async (): Promise<FilmType[]> => {
  return await customFetch.get(FILM_URL, { signalKey: 'getFilms' }).catch(showError)
}
export const getFilm = async (id: number): Promise<FilmType> => {
  return await customFetch.get(`${ADMIN_FILM_URL}`, { query: { id }, signalKey: 'getFilm' }).catch(showError)
}
export const deleteFilm = async (id: number): Promise<void> => {
  return await customFetch.delete(`${ADMIN_FILM_URL}/${id}`, { signalKey: 'deleteFilm' }).catch(showError)
}

export const updateFilm = async (newFilm: FilmType): Promise<void> => {
  return await customFetch
    .put(`${ADMIN_FILM_URL}/`, { body: newFilm, signalKey: 'updateFilm' })
    .catch(showError)
}
export const createFilm = async (newFilm: FilmType): Promise<void> => {
  return await customFetch.post(ADMIN_FILM_URL, { body: newFilm, signalKey: 'createFilm' }).catch(showError)
}
export const getOnCastingFilms = async (): Promise<FilmType[]> => {
  return await customFetch.get(`${FILM_URL}/OnCasting`, { signalKey: 'getFilms' }).catch(showError)
}
