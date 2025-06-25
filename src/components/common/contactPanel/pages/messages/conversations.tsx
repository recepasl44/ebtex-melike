import React, { useState } from 'react';
import { Form, Nav, Spinner } from 'react-bootstrap';
import SimpleBar from 'simplebar-react';
import dayjs from 'dayjs';
import { useConversationsList } from '../../../../hooks/conversations/useList';
import { ChatUser } from '../../../../../types/messages/chat';

interface Props {
  onSelect: (user: ChatUser, conversationId: string) => void;
}

const Conversations: React.FC<Props> = ({ onSelect }) => {
  const [activeTab, setActiveTab] = useState<'personal' | 'group'>('personal');
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { data = [], isLoading, isError } = useConversations({ type: activeTab, search });

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
          <Nav.Link active={activeTab === 'personal'} onClick={() => setActiveTab('personal')}>
            Kişisel
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link active={activeTab === 'group'} onClick={() => setActiveTab('group')}>
            Gruplar
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {isLoading && (
        <div className="text-center p-2">
          <Spinner animation="border" size="sm" />
        </div>
      )}
      {isError && <div className="text-danger text-center p-2">Yükleme hatası</div>}
      <SimpleBar className={`${activeTab === 'personal' ? 'chat-users-tab' : 'chat-groups-tab'} list-unstyled mb-0`}>
        <ul className="list-unstyled mb-0">
          {data.map((c: ChatUser) => (
            <li
              key={c.id}
              onClick={() => {
                setSelectedId(c.id);
                onSelect(c, c.id);
              }}
              className={`${selectedId === c.id ? 'active' : ''}`}
            >
              <div className="d-flex align-items-center">
                <span className="avatar avatar-sm avatar-rounded me-2">
                  <img src={c.imageUrl} alt="" />
                </span>
                <div className="flex-fill">
                  <div className="d-flex justify-content-between">
                    <span className="fw-semibold">{c.name}</span>
                    <span className="fs-12 text-muted">{dayjs(c.lastTimestamp).format('HH:mm')}</span>
                  </div>
                  <span className="chat-msg text-truncate">{c.lastMessage}</span>
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
