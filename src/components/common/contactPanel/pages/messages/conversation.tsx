import React, { useEffect, useState } from 'react';

interface Conversation {
  id: number;
  title?: string;
  isGroup?: boolean;
}

interface ConversationListProps {
  onSelect: (id: number) => void;
  selectedId?: number | null;
}

const ConversationList: React.FC<ConversationListProps> = ({ onSelect, selectedId }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConversations = async () => {
      setLoading(true);
      setError(null);
      try {
        const resp = await fetch('/api/conversations');
        if (!resp.ok) throw new Error('Failed to fetch conversations');
        const data = await resp.json();
        setConversations(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    fetchConversations();
  }, []);

  if (loading) return <div className="p-3">Loading conversations...</div>;
  if (error) return <div className="p-3 text-danger">{error}</div>;

  return (
    <div style={{ overflowY: 'auto', maxHeight: '100%' }}>
      {conversations.map((conv) => (
        <div
          key={conv.id}
          onClick={() => onSelect(conv.id)}
          style={{
            padding: '8px 12px',
            cursor: 'pointer',
            backgroundColor: selectedId === conv.id ? '#eef2ff' : 'transparent',
          }}
        >
          <div style={{ fontWeight: 500 }}>{conv.title || `Conversation ${conv.id}`}</div>
          <small>{conv.isGroup ? 'Group chat' : 'Direct chat'}</small>
        </div>
      ))}
    </div>
  );
};

export default ConversationList;
