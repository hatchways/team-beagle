import { IMessage } from '../../interface/Message';
import { FetchOptions } from '../../interface/FetchOptions';

interface NewMessage {
  message: IMessage;
}

const sendMessage = (id: string, type: string, content: string) => async (): Promise<NewMessage> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ type, content }),
  };
  return await fetch(`http://localhost:3001/message/${id}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default sendMessage;
