export interface NewUser {
  email: string;
  password_hash: string;
  username: string;
  full_name: string;
  isActive?: boolean;
  user_id: string;
}

export interface Message {
  id: number;
  text: string;
  sender: string;
  read: boolean;
  avatar?: string;
  picked?: boolean;
}
