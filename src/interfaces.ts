// User Interfaces

export interface IUser {
  id: number;
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  display_name: string;
  avatar: string;
}

// Chat Interfaces

export interface IChat {
  id: number;
  title: string;
  avatar?: string;
  unread_count?: number;
  created_by?: number;
  last_message?: {
    user: IUser;
    time: string;
    content: string;
  };
}

export interface IMessage {
  id: number;
  chat_id: number;
  time: string;
  type: string;
  user_id: string;
  content: string;
  is_read?: boolean;
}