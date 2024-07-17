import { FilmType } from '../types/film'
import { customFetch, showError } from '../util/http'
import { FILM_URL } from './constant'

export const getOnCastingFilms = async (): Promise<FilmType[]> => {
  return await customFetch.get(`${FILM_URL}/OnCasting`, { signalKey: 'getFilms' }).catch(showError)
}
