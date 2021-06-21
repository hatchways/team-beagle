import { AuthApiData } from '../../interface/AuthApiData';

const uploadPhoto = async (name: string, file: string | Blob): Promise<AuthApiData> => {
  console.log('uploading photo...')
  const data = new FormData();
  data.append('name', name);
  data.append('file', file);
  console.log(data)
  return await fetch('/user/uploadphoto', {
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
