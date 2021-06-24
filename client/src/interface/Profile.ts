import { User } from './User';

export interface Profile {
    userId: string;
    firstName: string;
    lastName: string;
    description: string;
    location: string;
    images: string;
    isDogSitter: boolean;
    rating: number;
    hourlyRate: number;
    tagLine: string,
  };

export interface SearchProfileApiData {
  users?: User[];
  profile?: Profile[];
  profiles?: Profile[];
  error?: { message: string };
}
