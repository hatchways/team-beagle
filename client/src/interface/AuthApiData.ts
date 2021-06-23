import { AnyARecord } from 'dns';
import { User } from './User';

export interface AuthApiDataSuccess {
  message: string;
  user: User;
  token: string;
  profile: any;
}

export interface AuthApiData {
  error?: { message: string };
  success?: AuthApiDataSuccess;
}
