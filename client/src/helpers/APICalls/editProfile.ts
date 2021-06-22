import { AuthApiData } from '../../interface/AuthApiData';
import { FetchOptions } from '../../interface/FetchOptions';

const editProfile = async (
  isDogSitter: boolean,
  firstName: string,
  lastName: string,
  selfDescription: string,
  hourlyRate: number,
  tagLine: string,
): Promise<AuthApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ isDogSitter, firstName, lastName, description: selfDescription, hourlyRate, tagLine }),
    credentials: 'include',
  };
  return await fetch(`/profile/editprofile`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default editProfile;
