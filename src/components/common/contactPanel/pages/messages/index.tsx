import React, { useState } from "react";
import Conversations from "./conversations";
import Chat from "./chat";

import { MessageConversation } from "../../../../../types/messages/list";

const MessagesIndex: React.FC<{ currentUserId: string }> = ({ currentUserId }) => {
  const [selectedConversation, setSelectedConversation] = useState<MessageConversation | null>(null);

  return (
    <div className="main-chart-wrapper d-lg-flex gap-2">
      <Conversations currentUserId={currentUserId} onSelect={setSelectedConversation} />
      {selectedConversation && (
        <Chat
          conversationId={String(selectedConversation.id)}
          currentUserId={currentUserId}
          user={{
            id: String(selectedConversation.id),
            name: selectedConversation.name,
            imageUrl: (selectedConversation as any).group_avatar_url || "",
            status: "online",
          }}
        />
      )}
    </div>
  );
};

export default MessagesIndex;
