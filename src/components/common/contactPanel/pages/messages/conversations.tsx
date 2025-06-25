import { useState } from 'react'
import { Form, InputGroup, Nav, Spinner } from 'react-bootstrap'
import SimpleBar from 'simplebar-react'
import dayjs from 'dayjs'
import { useConversationsList } from '../../../../hooks/conversations/useList'
import { MessageConversation } from '../../../../../types/messages/list'

interface Props {
  onSelect: (conversation: MessageConversation) => void
}

interface ConversationItem extends MessageConversation {
  avatarUrl?: string
  lastTimestamp?: string
  isTyping?: boolean
  lastMessage?: string
  unreadCount?: number
}

export default function Conversations({ onSelect }: Props) {
  const [activeTab, setActiveTab] = useState<'personal' | 'group'>('personal')
  const [search, setSearch] = useState('')
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const {
    conversationsData = [],
    loading,
    error,
  } = useConversationsList({ type: activeTab, search, enabled: true }) as unknown as {
    conversationsData: ConversationItem[]
    loading: boolean
    error: boolean
  }

  const handleSelect = (c: ConversationItem) => {
    setSelectedId(c.id)
    onSelect(c)
  }

  return (
    <div className="chat-info flex-shrink-0 border">
      <InputGroup className="p-3 border-bottom">
        <Form.Control
          placeholder="Kişiler Ara…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <InputGroup.Text className="btn-icon">
          <i className="ti ti-search" />
        </InputGroup.Text>
      </InputGroup>

      <Nav variant="tabs" className="tab-style-6 px-3">
        <Nav.Item>
          <Nav.Link active={activeTab === 'personal'} onClick={() => setActiveTab('personal')}>
            Sohbetler
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link active={activeTab === 'group'} onClick={() => setActiveTab('group')}>
            Gruplar
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {loading && (
        <div className="text-center p-2">
          <Spinner animation="border" size="sm" />
        </div>
      )}
      {error && <div className="text-danger text-center p-2">Yükleme hatası</div>}

      <SimpleBar className="list-unstyled mb-0">
        <ul className="list-unstyled mb-0">
          {conversationsData.map((c) => (
            <li
              key={c.id}
              onClick={() => handleSelect(c)}
              className={`d-flex p-2 align-items-center ${c.id === selectedId ? 'active' : ''}`}
              style={c.id === selectedId ? { background: '#f8eafd', borderLeft: '4px solid #6c5dd3' } : {}}
            >
              <img src={(c as any).avatarUrl} className="avatar avatar-md me-2" alt="" />
              <div className="flex-fill">
                <p className="mb-0 fw-medium">
                  {c.name}
                  <span className="float-end fs-11 text-muted">
                    {dayjs((c as any).lastTimestamp).format('HH:mm')}
                  </span>
                </p>
                <p className="fs-12 text-truncate mb-0">
                  {(c as any).isTyping ? (
                    <span className="text-success">Yazıyor…</span>
                  ) : (
                    (c as any).lastMessage
                  )}
                </p>
              </div>
              {(c as any).unreadCount > 0 && (
                <span className="badge bg-danger rounded-circle float-end">{(c as any).unreadCount}</span>
              )}
            </li>
          ))}
        </ul>
      </SimpleBar>
    </div>
  )
}
