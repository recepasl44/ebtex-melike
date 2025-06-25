import React, { useState } from "react";
import { Form, Nav, Spinner } from "react-bootstrap";
import SimpleBar from "simplebar-react";
import dayjs from "dayjs";
import { useConversationsList } from "../../../../hooks/conversations/useList";
import { useUsersTable } from "../../../../hooks/user/useList";
import { MessageConversation } from "../../../../../types/messages/list";
import { UserData } from "../../../../../types/user/list";

interface Props {
  onSelect: (conversation: MessageConversation) => void;
}

const Conversations: React.FC<Props> = ({ onSelect }) => {
  const [activeTab, setActiveTab] = useState<'chats' | 'groups' | 'users'>('chats');
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const conversationParams: any = { search, enabled: activeTab !== 'users' };
  if (activeTab === 'groups') conversationParams.type = 'group';

  const {
    conversationsData: conversations = [],
    loading: isConvLoading,
    error: isConvError,
  } = useConversationsList(conversationParams) as unknown as {
    conversationsData: MessageConversation[];
    loading: boolean;
    error: boolean;
  };

  const {
    usersData: users = [],
    loading: isUsersLoading,
    error: isUsersError,
  } = useUsersTable({ enabled: activeTab === 'users', search, page: 1, paginate: 50 }) as unknown as {
    usersData: UserData[];
    loading: boolean;
    error: boolean;
  };

  return (
    <div className="chat-info flex-shrink-0 border">
      <div className="p-3 border-bottom">
        <Form.Control
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Kişiler Ara…"
        />
      </div>
      <Nav variant="tabs" className="tab-style-6 px-3">
        <Nav.Item>
          <Nav.Link active={activeTab === 'chats'} onClick={() => setActiveTab('chats')}>
            Sohbetler
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link active={activeTab === 'groups'} onClick={() => setActiveTab('groups')}>
            Gruplar
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link active={activeTab === 'users'} onClick={() => setActiveTab('users')}>
            Kişiler
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {(isConvLoading || isUsersLoading) && (
        <div className="text-center p-2">
          <Spinner animation="border" size="sm" />
        </div>
      )}
      {(isConvError || isUsersError) && (
        <div className="text-danger text-center p-2">Yükleme hatası</div>
      )}
      <SimpleBar className="list-unstyled mb-0">
        <ul className="list-unstyled mb-0">
          {activeTab !== 'users' &&
            conversations.map((c: MessageConversation) => (
              <li
                key={c.id}
                onClick={() => {
                  setSelectedId(String(c.id));
                  onSelect(c);
                }}
                className={`${selectedId === String(c.id) ? 'active' : ''}`}
              >
                <div className="d-flex align-items-center">
                  <div className="flex-fill">
                    <div className="d-flex justify-content-between">
                      <span className="fw-semibold">{c.name}</span>
                      <span className="fs-12 text-muted">{dayjs(c.created_at).format('HH:mm')}</span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          {activeTab === 'users' &&
            users.map((u: UserData) => (
              <li key={u.id} className="">
                <div className="d-flex align-items-center">
                  <div className="flex-fill">
                    <div className="d-flex justify-content-between">
                      <span className="fw-semibold">{u.first_name} {u.last_name}</span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </SimpleBar>
    </div>
  );
};

export default Conversations;