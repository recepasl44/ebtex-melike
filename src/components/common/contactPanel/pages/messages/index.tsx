import React, { useState } from 'react';
import Conversations from './conversations';
import Chat from './chat';
import { ChatUser } from 'src/types/messages/chat';

const MessagesIndex: React.FC<{ currentUserId: string }> = ({ currentUserId }) => {
  const [activeUser, setActiveUser] = useState<ChatUser | null>(null);
  const [convId, setConvId] = useState<string | null>(null);

  return (
    <div className="main-chart-wrapper d-lg-flex gap-2">
      <Conversations
        onSelect={(user, id) => {
          setActiveUser(user);
          setConvId(id);
        }}
      />
      {activeUser && convId && (
        <Chat
          conversationId={convId}
          currentUserId={currentUserId}
          user={activeUser}
        />
      )}
    </div>
  );
};

export default MessagesIndex;
