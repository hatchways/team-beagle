import { User } from './User';
import { IMessage } from './Message';
import { Profile } from './Profile';

export interface Conversations {
  conversations: Conversation[];
}

// interface unreadMsg {
//   userId: string;
//   amount: number;
// }

export interface Conversation {
  participants: User[];
  participantProfiles: Profile[];
  messages: IMessage[];
  mostRecentMsg: IMessage;
  deleted: boolean;
  pinned: boolean;
  unreadMsgs: number;
  _id: string;
}

export interface ConversationsData {
  error?: { message: string };
  conversation?: Conversation;
}
