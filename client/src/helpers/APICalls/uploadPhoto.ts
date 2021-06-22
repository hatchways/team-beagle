import { AuthApiData } from '../../interface/AuthApiData';

const uploadPhoto = async (name: string, file: string | Blob): Promise<AuthApiData> => {
  console.log(name)
  console.log(file)
  const data = new FormData();
  data.append('name', name);
  data.append('file', file);
  console.log(data)
  return await fetch('/profile/upload-photo/60cf929344f9e43ab8da85b9', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    credentials: 'include',
    body: data,
  })
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default uploadPhoto;
