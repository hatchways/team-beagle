import { Profile } from './Profile';

export interface ReviewIF {
  _id: string;
  reviewerId: string;
  sitterId: string;
  rating: number;
  title: string;
  body: string;
}

export interface ReviewWithProfile extends ReviewIF {
  profile: Profile;
}
