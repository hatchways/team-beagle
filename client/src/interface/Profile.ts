import { User } from './User';

export interface Profile {
  userId: string;
  firstName: string;
  lastName: string;
  description: string;
  location: string;
  images: string[];
  isDogSitter: boolean;
  availabilityWeek: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
  availabilityDays?: {
    additionalDays?: Date;
    offDays?: Date;
  };
  rating?: number;
  hourlyRate?: number;
  tagLine: string;
  fullName?: string;
  isPaymentMethod?: boolean;
}

export interface SearchProfileApiData {
  users?: User[];
  profile?: Profile[];
  profiles?: Profile[];
  error?: { message: string };
}
