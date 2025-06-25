import React, { useState } from "react";
import { Form, Nav, Spinner } from "react-bootstrap";
import SimpleBar from "simplebar-react";
import dayjs from "dayjs";
import { useConversationsList } from "../../../../hooks/conversations/useList";
import { MessageConversation } from "../../../../../types/messages/list";

interface Props {
  onSelect: (conversation: MessageConversation) => void;
}

const Conversations: React.FC<Props> = ({ onSelect }) => {
  const [activeTab, setActiveTab] = useState<'personal' | 'group'>('personal');
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const {
    conversationsData: data = [],
    loading: isLoading,
    error: isError,
  } = useConversationsList({ type: activeTab, search, enabled: true }) as unknown as {
    conversationsData: MessageConversation[];
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
          {data.map((c: MessageConversation) => (
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
        </ul>
      </SimpleBar>
    </div>
  );
};

export default Conversations;