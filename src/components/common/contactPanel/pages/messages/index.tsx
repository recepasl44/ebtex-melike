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
  const [selectedConversation, setSelectedConversation] = useState<MessageConversation | null>(null);
  const [activeUser, setActiveUser] = useState<ChatUser | null>(null);

  return (
    <div className="main-chart-wrapper d-lg-flex gap-2">
      <Conversations
        currentUserId={currentUserId}
        onSelect={(conv: MessageConversation) => {
          setSelectedConversation(conv);
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
      {selectedConversation && activeUser && (
        <Chat
          conversationId={String(selectedConversation.id)}
          currentUserId={currentUserId}
          user={activeUser}
        />
      )}
    </div>
  );
};

export default MessagesIndex;
