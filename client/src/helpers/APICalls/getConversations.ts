import { Conversations } from '../../interface/Conversation';
import { FetchOptions } from '../../interface/FetchOptions';

const getConversations = () => async (): Promise<Conversations> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'appliation/json' },
    credentials: 'include',
  };
  return await fetch(`http://localhost:3001/message/conversation/all`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again.' },
    }));
};

export default getConversations;
