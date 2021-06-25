
const uploadPhoto = async (name: string, file: string | Blob): Promise<any> => {
  const data = new FormData();
  data.append('file', file);
  data.append('name', name);
  return await fetch('http://localhost:3001/profile/upload-photo', {
    method: 'POST',
    headers: {
      // 'Content-Type': 'multipart/form-data',
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
