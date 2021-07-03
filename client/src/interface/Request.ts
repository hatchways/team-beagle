import { Profile } from './Profile';

export interface Request {
  _id: string;
  userId: string;
  sitterId: string;
  startDate: Date;
  endDate: Date;
  accept: boolean;
  decline: boolean;
  paid: boolean;
}

export interface RequestWithProfile extends Request {
  profile: Profile;
}
