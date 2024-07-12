import { customFetch, showError } from '../util/http';
import { cinema } from '../types/cinema';

export const getCinemas = async (): Promise<cinema[]> => {
  return await customFetch
    .get('/cinema', { signalKey: 'getCinemas' })
    .catch(showError);
};

export const getCinema = async (id: number): Promise<cinema> => {
  return await customFetch
    .get(`/cinema/${id}`, { signalKey: 'getCinema' })
    .catch(showError);
};

export const createCinema = async (data: cinema): Promise<cinema> => {
  return await customFetch
    .post('/cinema', { data, signalKey: 'createCinema' })
    .catch(showError);
};

export const updateCinema = async (
  id: number,
  data: cinema,
  setCinemas: React.Dispatch<React.SetStateAction<cinema[]>>,
): Promise<void> => {
  try {
    const response = await customFetch.put(`admin/cinema`, {
      ...data,
      signalKey: 'updateCinema',
    });

    setCinemas((prevCinemas) =>
      prevCinemas.map((c) => (c.id === id ? data : c)),
    );
  } catch (error) {
    showError(error); 
  }
};

export const deleteCinema = async (
  id: number,
  setCinemas: React.Dispatch<React.SetStateAction<cinema[]>>,
): Promise<void> => {
  try {
    const response = await customFetch.delete(`/cinema/${id}`, {
      signalKey: 'deleteCinema',
    });
    setCinemas((prevCinemas) =>
      prevCinemas.filter((c) => c.id !== id),
    );
  } catch (error) {
    showError(error); 
  }
};