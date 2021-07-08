import { User } from './User';

export interface IMessage {
  _id: string;
  sender: string;
  recipient: string;
  type: string;
  read: boolean;
  content: string;
  createdAt: Date;
}
