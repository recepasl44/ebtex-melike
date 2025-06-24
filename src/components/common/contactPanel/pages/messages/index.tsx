import React, { useState } from 'react';
import ConversationList from './conversation';
import Chat from './chat';

const MessagesPage: React.FC = () => {
  const [selectedConversationId, setSelectedConversationId] = useState<number | null>(null);

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div style={{ width: '30%', borderRight: '1px solid #eee' }}>
        <ConversationList onSelect={setSelectedConversationId} selectedId={selectedConversationId} />
      </div>
      <div style={{ flex: 1 }}>
        <Chat conversationId={selectedConversationId} />
      </div>
    </div>
  );
};

export default MessagesPage;
