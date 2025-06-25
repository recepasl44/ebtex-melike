import React, { useState } from "react";
import Conversations from "./conversations";
import Chat from "./chat";

import { MessageConversation } from "../../../../../types/messages/list";
interface ChatUser {
  id: string;
  name: string;
  imageUrl: string;
  status: string;
  isGroup?: boolean;
  lastMessage?: string;
  lastTimestamp?: string;
}

const MessagesIndex: React.FC<{ currentUserId: string }> = ({ currentUserId }) => {
  const [activeConversation, setActiveConversation] = useState<MessageConversation | null>(null);
  const [activeUser, setActiveUser] = useState<ChatUser | null>(null);

  return (
    <div className="main-chart-wrapper d-lg-flex gap-2">
      <Conversations
        onSelect={(conv: MessageConversation) => {
          setActiveConversation(conv);
          setActiveUser({
            id: String(conv.id),
            name: conv.name,
            imageUrl: "",
            status: "online",
            isGroup: conv.type_id !== 0,
            lastMessage: "",
            lastTimestamp: conv.created_at || "",
          });
        }}
      />
      {activeConversation && activeUser && (
        <Chat
          conversationId={String(activeConversation.id)}
          currentUserId={currentUserId}
          user={activeUser}
        />
      )}
    </div>
  );
};

export default MessagesIndex;