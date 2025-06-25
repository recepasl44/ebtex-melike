import React, { useState } from 'react';
import Conversations from './conversations';
import ChatWindow from './chat';
import type { ChatUser } from './types';

const MessagesPage: React.FC = () => {
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [activeUser, setActiveUser] = useState<ChatUser | null>(null);

  const userData = localStorage.getItem('userData');
  const loginUserId = userData ? String(JSON.parse(userData).me?.id ?? '') : '';

  return (
    <div className="row">
      <div className="col-lg-4">
        <Conversations
          onSelect={(user, convId) => {
            setActiveUser(user);
            setActiveConversationId(convId);
          }}
        />
      </div>
      <div className="col-lg-8">
        {activeConversationId && activeUser && (
          <ChatWindow
            conversationId={activeConversationId}
            currentUserId={loginUserId}
            user={activeUser}
          />
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
