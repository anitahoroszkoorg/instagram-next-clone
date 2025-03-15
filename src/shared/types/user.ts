export interface NewUser {
  email: string;
  password_hash: string;
  username: string;
  full_name: string;
  isActive?: boolean;
}

export interface User extends NewUser {
  user_id: string;
  bio: string | null;
  created_at: Date;
  profile_picture: string;
}

export interface UserInfo extends User {
  followed: User[];
  followers: User[];
}
