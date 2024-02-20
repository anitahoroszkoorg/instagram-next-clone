export interface Message {
  id: number;
  text: string;
  sender: string;
  read: boolean;
  avatar?: string;
  picked?: boolean;
}
