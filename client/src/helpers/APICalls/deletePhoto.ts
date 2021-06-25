import { FetchOptions } from '../../interface/FetchOptions';

const deletePhoto = async (imageUrl: string, index: number): Promise<any> => {
  const fetchOptions: FetchOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageUrl, index }),
    credentials: 'include',
  };
  return await fetch('http://localhost:3001/profile/delete-photo', fetchOptions)
  .then((res) => res.json())
  .catch(() => ({
    error: { message: 'Unable to connect to server. Please try again' },
  }));
};

export default deletePhoto