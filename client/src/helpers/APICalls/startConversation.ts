import { FetchOptions } from '../../interface/FetchOptions';

interface NewConversation {
  error: string;
  success: boolean;
}

const startConversation = async (id: string, username: string): Promise<NewConversation> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ type: 'msg', content: `${username} has sent a booking request - Loving Sitter` }),
  };
  return await fetch(`http://localhost:3001/message/conversation/create/${id}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default startConversation;
