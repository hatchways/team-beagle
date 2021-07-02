import { FetchOptions } from "../../interface/FetchOptions";
import { NewRequest, CreateRequestApiData } from '../../interface/NewRequest';

export const createBookingRequest = async (data: NewRequest): Promise<CreateRequestApiData> => {
    const fetchOptions: FetchOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data }),
        credentials: 'include',
  };
  return await fetch('/request', fetchOptions)
        .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};