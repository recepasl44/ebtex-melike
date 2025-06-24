import React, { useEffect, useState } from 'react';

interface Message {
  id: number;
  conversationId: number;
  senderId: number;
  senderName: string;
  senderAvatarUrl?: string;
  text: string;
  sentAt: string;
  outgoing?: boolean;
}

interface ChatProps {
  conversationId: number | null;
}

const Chat: React.FC<ChatProps> = ({ conversationId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!conversationId) {
      setMessages([]);
      return;
    }
    const fetchMessages = async () => {
      setLoading(true);
      setError(null);
      try {
        const resp = await fetch(`/api/messages?conversation_id=${conversationId}`);
        if (!resp.ok) throw new Error('Failed to fetch messages');
        const data = await resp.json();
        setMessages(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [conversationId]);

  if (!conversationId) {
    return <div className="p-3">Select a conversation</div>;
  }

  if (loading) return <div className="p-3">Loading messages...</div>;
  if (error) return <div className="p-3 text-danger">{error}</div>;

  return (
    <div style={{ overflowY: 'auto', maxHeight: '100%', padding: '8px 12px' }}>
      {messages.map((msg) => (
        <div
          key={msg.id}
          style={{
            marginBottom: '8px',
            display: 'flex',
            flexDirection: msg.outgoing ? 'row-reverse' : 'row',
            alignItems: 'flex-start',
          }}
        >
          {msg.senderAvatarUrl && (
            <img
              src={msg.senderAvatarUrl}
              alt={msg.senderName}
              style={{ width: 32, height: 32, borderRadius: '50%', marginRight: 8 }}
            />
          )}
          <div style={{ maxWidth: '70%' }}>
            <div
              style={{
                background: msg.outgoing ? '#d1e7dd' : '#f8f9fa',
                borderRadius: 8,
                padding: '6px 10px',
              }}
            >
              <strong>{msg.senderName}</strong>
              <div>{msg.text}</div>
            </div>
            <small className="text-muted">{new Date(msg.sentAt).toLocaleString()}</small>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chat;
