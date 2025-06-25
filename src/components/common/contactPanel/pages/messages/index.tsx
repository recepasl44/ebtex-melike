import React, { useState } from 'react';
import Conversations from './conversations';
import Chat from './chat';
import { ChatUser } from './types';

const MessagesIndex: React.FC<{ currentUserId: string }> = ({ currentUserId }) => {
  const [activeUser, setActiveUser] = useState<ChatUser | null>(null);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);

  return (
    <div className="main-chart-wrapper d-lg-flex gap-2">
      <Conversations onSelect={(user, id) => { setActiveUser(user); setActiveConvId(id); }} />
      {activeConvId && activeUser && (
        <Chat conversationId={activeConvId} currentUserId={currentUserId} user={activeUser} />
      )}
    </div>
  );
};

export default MessagesIndex;
