import { User } from './User';

export interface Profile {
    userId: string;
    firstName: string;
    lastName: string;
    description: string;
    location: string;
    images: string;
    isDogSitter: Boolean;
    rating: Number;
    hourlyRate: Number;
    tagLine: String,
  };

export interface SearchProfileApiData {
  users?: User[];
  profile?: Profile[];
  error?: { message: string };
}
