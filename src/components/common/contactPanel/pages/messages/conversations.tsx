import { useState } from 'react'
import { Form, InputGroup, Nav, Spinner } from 'react-bootstrap'
import SimpleBar from 'simplebar-react'
import dayjs from 'dayjs'
import { useConversationsList } from '../../../../hooks/conversations/useList'
import { MessageConversation } from '../../../../../types/messages/list'

interface Props {
  onSelect: (c: MessageConversation) => void
}

interface ConversationItem extends MessageConversation {
  avatarUrl?: string
  lastTimestamp?: string
  isTyping?: boolean
  lastMessage?: string
  unreadCount?: number
}

export default function Conversations({ onSelect }: Props) {
  const [activeTab, setActiveTab] = useState<'sohbet' | 'grup' | 'kisiler'>('sohbet')
  const [search, setSearch] = useState('')
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const { conversationsData = [], loading, error } = useConversationsList({
    type: activeTab === 'sohbet' ? 'personal' : activeTab === 'grup' ? 'group' : 'contacts',
    search,
    enabled: true,
  }) as unknown as {
    conversationsData: ConversationItem[]
    loading: boolean
    error: boolean
  }

  return (
    <div className="chat-info flex-shrink-0 border d-flex flex-column">
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
          <Nav.Link active={activeTab === 'sohbet'} onClick={() => setActiveTab('sohbet')}>
            Sohbetler
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link active={activeTab === 'grup'} onClick={() => setActiveTab('grup')}>
            Gruplar
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link active={activeTab === 'kisiler'} onClick={() => setActiveTab('kisiler')}>
            Kişiler
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {activeTab === 'sohbet' && <p className="fs-12 px-3 mt-2">Sohbetler</p>}
      {activeTab === 'grup' && (
        <div className="d-flex justify-content-between px-3 mt-2">
          <p>Gruplar</p>
          <button className="btn btn-sm btn-primary">Grup Oluştur</button>
        </div>
      )}
      {activeTab === 'kisiler' && <p className="fs-12 px-3 mt-2">Kişiler</p>}

      {loading && (
        <div className="flex-fill d-flex justify-content-center align-items-center">
          <Spinner size="sm" />
        </div>
      )}
      {error && <div className="text-danger text-center">Yükleme hatası</div>}

      <SimpleBar className="flex-fill">
        <ul className="list-unstyled mb-0">
          {conversationsData.map((c) => (
            <li
              key={c.id}
              onClick={() => {
                setSelectedId(c.id)
                onSelect(c)
              }}
              className={`d-flex p-2 align-items-center ${c.id === selectedId ? 'active' : ''}`}
              style={c.id === selectedId ? { background: '#f8eafd', borderLeft: '4px solid #6c5dd3' } : {}}
            >
              <img src={c.avatarUrl} className="avatar avatar-md me-2" alt="" />
              <div className="flex-fill">
                <div className="d-flex justify-content-between">
                  <span className="fw-medium">{c.name}</span>
                  <span className="fs-11 text-muted">{dayjs(c.lastTimestamp).format('HH:mm')}</span>
                </div>
                <div className="fs-12 text-truncate">
                  {c.isTyping ? <span className="text-success">Yazıyor…</span> : c.lastMessage}
                </div>
              </div>
              {c.unreadCount! > 0 && <span className="badge bg-danger rounded-circle">{c.unreadCount}</span>}
            </li>
          ))}
        </ul>
      </SimpleBar>
    </div>
  )
}
