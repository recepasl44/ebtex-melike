export interface ChatUser {
  id: string;
  name: string;
  imageUrl: string;
  status: 'online' | 'offline';
  isGroup: boolean;
  lastMessage: string;
  lastTimestamp: string; // ISO string
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string; // ISO string
}
