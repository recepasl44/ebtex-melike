export interface ChatUser {
  id: string;
  name: string;
  imageUrl: string;
  status: 'online' | 'offline';
  isGroup: boolean;
  lastMessage: string;
  lastTimestamp: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string; // ISO
}