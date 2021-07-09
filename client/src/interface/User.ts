import { Profile } from './Profile';

export interface User {
  email: string;
  username: string;
  id: string;
  newUser?: boolean;
}

export interface SearchUsersApiData {
  users?: User[];
  error?: { message: string };
}
