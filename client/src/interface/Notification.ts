export interface INotification {
  _id: string;
  sender: string;
  recipient: string;
  type: string;
  content: string;
  title: string;
  read: boolean;
  createdAt: Date;
}
