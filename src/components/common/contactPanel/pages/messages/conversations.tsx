import React, { useState } from "react";
import SimpleBar from "simplebar-react";
import { useConversationsList } from "../../../../hooks/conversations/useList";
import { MessageConversation } from "../../../../../types/messages/list";

interface Props {
  currentUserId: string;
  onSelect: (c: MessageConversation) => void;
}

const Conversations: React.FC<Props> = ({ currentUserId, onSelect }) => {
  const [activeTab, setActiveTab] = useState<'chats' | 'groups' | 'users'>('chats');

  const { conversationsData = [] } = useConversationsList({
    enabled: true,
    ...(activeTab === 'chats'
      ? { user_id: Number(currentUserId) }
      : activeTab === 'groups'
      ? { type_id: 1 }
      : {}),
    paginate: 1,
    per_page: 10,
    orderBy: 'desc',
  });

  return (
    <div className="chat-info flex-shrink-0 border">
      <div className="d-flex p-2 border-bottom gap-1">
        <button
          onClick={() => setActiveTab('chats')}
          className={`btn btn-sm flex-fill ${activeTab === 'chats' ? 'btn-primary' : 'btn-light'}`}
        >
          Sohbetler
        </button>
        <button
          onClick={() => setActiveTab('groups')}
          className={`btn btn-sm flex-fill ${activeTab === 'groups' ? 'btn-primary' : 'btn-light'}`}
        >
          Gruplar
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`btn btn-sm flex-fill ${activeTab === 'users' ? 'btn-primary' : 'btn-light'}`}
        >
          Kişiler
        </button>
      </div>
      <SimpleBar className="chat-contacts-tab list-unstyled mb-0">
        <ul className="list-unstyled mb-0">
          {conversationsData.map((c) => (
            <li
              key={c.id}
              onClick={() => onSelect(c)}
              className="px-3 py-2 border-bottom cursor-pointer"
            >
              {c.name}
            </li>
          ))}
        </ul>
      </SimpleBar>
    </div>
  );
};

export default Conversations;
