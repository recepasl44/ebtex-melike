import React, { useEffect, useState } from 'react';
import { Tab, Nav } from 'react-bootstrap';
import SimpleBar from 'simplebar-react';
import type { ChatUser } from './types';

interface Conversation {
  id: string;
  name: string;
  image: string;
  status: 'online' | 'offline';
  isGroup: boolean;
  lastMessage?: string;
  timestamp?: string;
}

interface Props {
  onSelect: (user: ChatUser, conversationId: string) => void;
}

const Conversations: React.FC<Props> = ({ onSelect }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    fetch('/api/conversations')
      .then((r) => r.json())
      .then((data) => setConversations(data))
      .catch((err) => console.error('Conversations load error', err));
  }, []);

  const renderList = (items: Conversation[]) => (
    <SimpleBar className="chat-users-tab">
      <ul className="list-unstyled mb-0">
        {items.map((c) => (
          <li
            key={c.id}
            className="d-flex align-items-center p-2"
            onClick={() =>
              onSelect(
                { id: c.id, name: c.name, image: c.image, status: c.status },
                c.id
              )
            }
          >
            <span className="avatar avatar-md avatar-rounded me-2">
              <img src={c.image} alt={c.name} />
            </span>
            <div className="flex-grow-1">
              <p className="mb-0 fw-medium">{c.name}</p>
              {c.lastMessage && (
                <span className="text-muted chat-msg">{c.lastMessage}</span>
              )}
            </div>
            {c.timestamp && (
              <span className="fs-10 text-muted">{c.timestamp}</span>
            )}
          </li>
        ))}
      </ul>
    </SimpleBar>
  );

  const personal = conversations.filter((c) => !c.isGroup);
  const groups = conversations.filter((c) => c.isGroup);

  return (
    <Tab.Container defaultActiveKey="personal">
      <div>
        <Nav variant="pills" className="nav-tabs mb-3">
          <Nav.Item>
            <Nav.Link eventKey="personal">Kişisel</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="groups">Gruplar</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="personal">{renderList(personal)}</Tab.Pane>
          <Tab.Pane eventKey="groups">{renderList(groups)}</Tab.Pane>
        </Tab.Content>
      </div>
    </Tab.Container>
  );
};

export default Conversations;
