import React, { useMemo, useState, useEffect } from "react";
import { Form, Nav, Spinner, Tab, Button, Collapse } from "react-bootstrap";
import SimpleBar from "simplebar-react";
import dayjs from "dayjs";
import { useConversationsList } from "../../../../hooks/conversations/useList";
import { useUsersTable } from "../../../../hooks/user/useList";
import { MessageConversation } from "../../../../../types/messages/list";
import { ConversationData } from "../../../../../types/conversations/list";
import { UserData } from "../../../../../types/user/list";

interface Props {
  currentUserId: string;
  onSelect: (conversation: MessageConversation) => void;
}

const Conversations: React.FC<Props> = ({ currentUserId, onSelect }) => {
  const [activeTab, setActiveTab] = useState<'chats' | 'groups' | 'users'>('chats');
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showGroupPanel, setShowGroupPanel] = useState(false);
  const [groupSearch, setGroupSearch] = useState('');

  const conversationParams: any = { search, enabled: activeTab !== 'users' };
  if (activeTab === 'groups') conversationParams.type_id = 1;
  if (activeTab === 'chats') conversationParams.user_id = currentUserId;

  const {
    conversationsData: conversations = [],
    loading: isConvLoading,
    error: isConvError,
  } = useConversationsList(conversationParams) as unknown as {
    conversationsData: ConversationData[];
    loading: boolean;
    error: boolean;
  };

  const {
    usersData: users = [],
    loading: isUsersLoading,
    error: isUsersError,
  } = useUsersTable({
    enabled: activeTab === 'users' || (activeTab === 'groups' && showGroupPanel),
    search: activeTab === 'users' ? search : groupSearch,
    page: 1,
    perPage: 50,
  }) as unknown as {
    usersData: UserData[];
    loading: boolean;
    error: boolean;
  };

  const groupedUsers = useMemo(() => {
    const groups: Record<string, UserData[]> = {};
    users.forEach((u) => {
      const letter = (u.first_name[0] || '').toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(u);
    });
    return groups;
  }, [users]);

  const searchPlaceholder = useMemo(() => {
    if (activeTab === 'chats') return 'Sohbet Ara…';
    if (activeTab === 'groups') return 'Gruplar Ara…';
    return 'Kişiler Ara…';
  }, [activeTab]);

  useEffect(() => {
    if (activeTab !== 'groups') {
      setShowGroupPanel(false);
      setGroupSearch('');
    }
  }, [activeTab]);

  return (
    <div className="chat-info flex-shrink-0 border">
      <div className="p-3 border-bottom">
        <Form.Control
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={searchPlaceholder}
        />
      </div>
      <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k as 'chats' | 'groups' | 'users')}>
        <Nav variant="tabs" className="tab-style-6 px-3">
          <Nav.Item>
            <Nav.Link eventKey="chats">Sohbetler</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="groups">Gruplar</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="users">Kişiler</Nav.Link>
          </Nav.Item>
        </Nav>
      </Tab.Container>
      {activeTab === 'groups' ? (
        <div className="d-flex justify-content-between align-items-center px-3 pt-2 pb-2 border-bottom">
          <span className="fw-semibold">Grup Sohbetleri</span>
          <Button size="sm" onClick={() => setShowGroupPanel(true)}>
            Grup Oluştur
          </Button>
        </div>
      ) : (
        <div className="small text-muted px-3 pt-2 pb-2 border-bottom">
          {activeTab === 'chats' && 'Sohbetler'}
          {activeTab === 'users' && 'Kişiler'}
        </div>
      )}
      {(isConvLoading || isUsersLoading) && (
        <div className="text-center p-2">
          <Spinner animation="border" size="sm" />
        </div>
      )}
      {(isConvError || isUsersError) && (
        <div className="text-danger text-center p-2">Yükleme hatası</div>
      )}
      <SimpleBar
        className={`${activeTab === 'chats'
          ? 'chat-contacts-tab'
          : activeTab === 'groups'
            ? 'chat-groups-tab'
            : 'chat-users-tab'
          } list-unstyled mb-0`}
      >
        <ul className="list-unstyled mb-0">
          {activeTab !== 'users' &&
            conversations.map((c: ConversationData) => (
              <li
                key={c.id}
                onClick={() => {
                  setSelectedId(String(c.id));
                  onSelect(c as unknown as MessageConversation);
                }}
                className={`${selectedId === String(c.id) ? 'active' : ''
                  } ${(c as any).unreadCount ? 'chat-msg-unread' : ''
                  } ${(c as any).isTyping ? 'chat-msg-typing' : ''
                  }`}
              >
                <div className="d-flex align-items-center">
                  <span className="avatar avatar-sm avatar-rounded me-2">
                    <img src={(c as any).avatarUrl || ''} alt="" />
                  </span>
                  <div className="flex-fill">
                    <div className="d-flex justify-content-between">
                      <span className="fw-semibold">{c.name}</span>
                      <span className="fs-12 text-muted">
                        {dayjs((c as any).lastTimestamp || c.created_at).format('HH:mm')}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="chat-msg">
                        {(c as any).isTyping
                          ? `${(c as any).isTyping} Yazıyor…`
                          : `${(c as any).lastSender || ''}${(c as any).lastSender ? ': ' : ''}${(c as any).lastMessage || ''}`}
                      </span>
                      {(c as any).unreadCount ? (
                        <span className="badge bg-danger rounded-pill">
                          {(c as any).unreadCount}
                        </span>
                      ) : (
                        <span className="chat-read-icon">
                          <i className="ri-check-line" />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          {activeTab === 'users' &&
            Object.keys(groupedUsers)
              .sort()
              .map((letter) => (
                <React.Fragment key={letter}>
                  <li className="px-3 py-1 text-muted fw-semibold">{letter}</li>
                  {groupedUsers[letter].map((u) => (
                    <li key={u.id} className="px-3 py-1">
                      <div className="d-flex align-items-center">
                        <div className="flex-fill">
                          <span className="fw-semibold">
                            {u.first_name} {u.last_name}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </React.Fragment>
              ))}
        </ul>
      </SimpleBar>
      {activeTab === 'groups' && (
        <Collapse in={showGroupPanel}>
          <div className="border-bottom">
            <div className="d-flex justify-content-between align-items-center px-3 pt-2 pb-2 border-top">
              <span className="fw-semibold">Gruba Üye Ekleyin</span>
              <Button variant="link" size="sm" className="p-0" onClick={() => setShowGroupPanel(false)}>
                <i className="ri-close-line"></i>
              </Button>
            </div>
            <div className="px-3 pb-2">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Kişi Ara…"
                  value={groupSearch}
                  onChange={(e) => setGroupSearch(e.target.value)}
                  className="me-2"
                />
                <Button variant="primary" type="submit">
                  <i className="ri-search-line"></i>
                </Button>
              </Form>
            </div>
            <SimpleBar className="chat-users-tab list-unstyled mb-0" style={{ maxHeight: '200px' }}>
              <ul className="list-unstyled mb-0">
                {Object.keys(groupedUsers)
                  .sort()
                  .map((letter) => (
                    <React.Fragment key={letter}>
                      <li className="px-3 py-1 text-muted fw-semibold">{letter}</li>
                      {groupedUsers[letter].map((u) => (
                        <li key={u.id} className="px-3 py-1">
                          <div className="d-flex align-items-center">
                            <span className="avatar avatar-sm avatar-rounded me-2">
                              <img src={u.picture} alt="" />
                            </span>
                            <div className="flex-fill">
                              <span className="fw-semibold">
                                {u.first_name} {u.last_name}
                              </span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </React.Fragment>
                  ))}
              </ul>
            </SimpleBar>
          </div>
        </Collapse>
      )}
    </div>
  );
};

export default Conversations;