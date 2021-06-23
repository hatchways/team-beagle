import { User } from './User';
import { Profile } from './Profile';

export interface AuthApiDataSuccess {
  message: string;
  user: User;
  token: string;
  profile: Profile;
}

export interface AuthApiData {
  error?: { message: string };
  success?: AuthApiDataSuccess;
}
