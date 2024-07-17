import { FilmType } from '../types/film'
import { customFetch, showError } from '../util/http'
import { ADMIN_FILM_URL, FILM_URL } from './constant'

export const getfilms = async (): Promise<FilmType[]> => {
  return await customFetch.get(FILM_URL, { signalKey: 'getFilms' }).catch(showError)
}