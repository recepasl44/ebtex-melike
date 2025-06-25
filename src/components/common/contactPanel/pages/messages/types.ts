export interface ChatUser {
  id: string;
  name: string;
  image: string;
  status: 'online' | 'offline';
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}
