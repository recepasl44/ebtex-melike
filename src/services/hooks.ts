import { useMutation, useQuery } from '@tanstack/react-query';
import axiosInstance from './axiosClient';
import { ChatMessage, ChatUser } from '../components/common/contactPanel/pages/messages/types';

export function useGetConversations(params: { type: 'personal' | 'groups'; search: string }) {
  return useQuery<ChatUser[], Error>(['conversations', params], async () => {
    const { data } = await axiosInstance.get('/conversations', { params });
    return data;
  });
}

export function useGetMessages(conversationId: string) {
  return useQuery<ChatMessage[], Error>(['messages', conversationId], async () => {
    const { data } = await axiosInstance.get(`/conversations/${conversationId}/messages`);
    return data;
  });
}

export function useSendMessage(conversationId: string) {
  return useMutation(async (body: { text: string }) => {
    const { data } = await axiosInstance.post(`/conversations/${conversationId}/messages`, body);
    return data;
  });
}
