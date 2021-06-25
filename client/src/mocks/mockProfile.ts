import { string } from 'yup/lib/locale';
import { Profile } from '../interface/Profile';

const mockUserProfile: Profile = {
  userId: 'mockUserId',
  firstName: 'mockFirstName',
  lastName: 'mockLaastName',
  description: 'mockdesc',
  location: 'mock location',
  images: ['test1', 'test2', 'test3'],
  isDogSitter: false,
  availabilityWeek: {
    monday: false,
    tuesday: true,
    wednesday: false,
    thursday: false,
    friday: true,
    saturday: true,
    sunday: true,
  },
  availabilityDays: {
    additionalDays: new Date(),
    offDays: new Date(),
  },
  rating: 2,
  hourlyRate: 25,
  tagLine: 'mock tag',
};

const mockOtherUserProfile1: Profile = {
  userId: 'mockUserId',
  firstName: 'mockFirstName',
  lastName: 'mockLaastName',
  description: 'mockdesc',
  location: 'mock location',
  images: ['test1', 'test2', 'test3'],
  isDogSitter: false,
  availabilityWeek: {
    monday: false,
    tuesday: true,
    wednesday: false,
    thursday: false,
    friday: true,
    saturday: true,
    sunday: true,
  },
  availabilityDays: {
    additionalDays: new Date(),
    offDays: new Date(),
  },
  rating: 2,
  hourlyRate: 25,
  tagLine: 'mock tag',
};
const mockOtherUserProfile2: Profile = {
  userId: 'mockUserId',
  firstName: 'mockFirstName',
  lastName: 'mockLaastName',
  description: 'mockdesc',
  location: 'mock location',
  images: ['test1', 'test2', 'test3'],
  isDogSitter: false,
  availabilityWeek: {
    monday: false,
    tuesday: true,
    wednesday: false,
    thursday: false,
    friday: true,
    saturday: true,
    sunday: true,
  },
  availabilityDays: {
    additionalDays: new Date(),
    offDays: new Date(),
  },
  rating: 2,
  hourlyRate: 25,
  tagLine: 'mock tag',
};
const mockOtherUserProfile3: Profile = {
  userId: 'mockUserId',
  firstName: 'mockFirstName',
  lastName: 'mockLaastName',
  description: 'mockdesc',
  location: 'mock location',
  images: ['test1', 'test2', 'test3'],
  isDogSitter: false,
  availabilityWeek: {
    monday: false,
    tuesday: true,
    wednesday: false,
    thursday: false,
    friday: true,
    saturday: true,
    sunday: true,
  },
  availabilityDays: {
    additionalDays: new Date(),
    offDays: new Date(),
  },
  rating: 2,
  hourlyRate: 25,
  tagLine: 'mock tag',
};

const mockOthermockUserProfiles: Profile[] = [mockOtherUserProfile1, mockOtherUserProfile2, mockOtherUserProfile3];

export { mockUserProfile, mockOthermockUserProfiles };
