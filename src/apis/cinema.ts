import { customFetch, showError } from '../util/http';
import { cinema } from '../types/cinema';

export const getCinemas = async (): Promise<any> => {
  return await customFetch
    .get('/cinema', { signalKey: 'getCinemas' })
    .catch(showError);
};

export const getCinema = async (id: number): Promise<any> => {
  return await customFetch
    .get(`/cinema/${id}`, { signalKey: 'getCinema' })
    .catch(showError);
};

export const createCinema = async (data: cinema): Promise<any> => {
  return await customFetch
    .post('/cinema', { data, SignalKey: 'createCinema' })
    .catch(showError);
};

export const updateCinema = async (id: number, data: cinema): Promise<any> => {
  return await customFetch
    .put(`/cinema/${id}`, { ...data, signalKey: 'updateCinema' })
    .catch(showError);
};

export const deleteCinema = async (id: number): Promise<any> => {
  return await customFetch
    .delete(`/cinema/${id}`, { signalKey: 'deleteCinema' })
    .catch(showError);
};
