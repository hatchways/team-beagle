import { FetchOptions } from '../../interface/FetchOptions';
import { Request } from '../../interface/Request';

export async function getBookings(): Promise<Request> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/request/bookings`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}

export async function updateAccept(id: string, accept: boolean, decline: boolean): Promise<Request> {
  const fetchOptions: FetchOptions = {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ accept, decline }),
  };
  return await fetch(`/request/edit-request/${id}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
