import { FetchOptions } from '../../interface/FetchOptions';
import { INotification } from '../../interface/Notification';

export const patchNotificationAsRead = async (): Promise<any> => {
  console.log('marking notification as read');
};

export const patchAllNotificationsAsRead = async (): Promise<any> => {
  const fetchOptions: FetchOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch(`http://localhost:3001/notifications/readall`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};
