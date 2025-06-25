import { useEffect, useRef, useState } from 'react'
import { Button, Form, Spinner } from 'react-bootstrap'
import SimpleBar from 'simplebar-react'
import EmojiPicker from 'emoji-picker-react'
import dayjs from 'dayjs'
import { useMessagesList } from '../../../../hooks/messages/useList'
import { useMessageAdd } from '../../../../hooks/messages/useAdd'
import { MessageConversation, MessageData } from '../../../../../types/messages/list'

interface Props {
  conversationId: string
  currentUserId: string
  user: MessageConversation & { avatarUrl?: string; status?: 'online' | 'offline' }
}

export default function Chat({ conversationId, currentUserId, user }: Props) {
  const { messagesData = [], loading, error, refetch } = useMessagesList({
    enabled: Boolean(conversationId),
    conversation_id: Number(conversationId),
    page: 1,
    pageSize: 50,
  }) as { messagesData: MessageData[]; loading: boolean; error: boolean; refetch: () => void }

  const { addNewMessage } = useMessageAdd()
  const [text, setText] = useState('')
  const [showEmoji, setShowEmoji] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messagesData])

  const handleSend = async () => {
    if (!text.trim()) return
    await addNewMessage({
      conversation_id: Number(conversationId),
      sender_id: Number(currentUserId),
      body: text,
    })
    setText('')
    setShowEmoji(false)
    refetch()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="main-chat-area border position-relative d-flex flex-column flex-fill">
      <div className="main-chat-head d-flex align-items-center justify-content-between border-bottom p-2">
        <div className="d-flex align-items-center">
          <span className="avatar avatar-md avatar-rounded me-2">
            <img src={user.avatarUrl} alt="" />
          </span>
          <div>
            <p className="mb-0 fw-medium">{user.name}</p>
            <span className="fs-11 text-muted">{user.status}</span>
          </div>
        </div>
        <Button variant="light" className="btn-icon btn-sm" onClick={() => setShowInfo(true)}>
          <i className="ti ti-info-circle" />
        </Button>
      </div>

      <SimpleBar className="chat-content flex-grow-1">
        <ul className="list-unstyled mb-0">
          {loading && <li className="text-center py-4"><Spinner size="sm" /></li>}
          {error && <li className="text-danger text-center py-4">Mesajlar yüklenemedi</li>}
          {messagesData.map((m) => {
            const ts = m.created_at || ''
            return (
              <li key={m.id} className={m.sender_id === +currentUserId ? 'chat-item-end' : 'chat-item-start'}>
                <div className="main-chat-msg">
                  <p className="mb-0">{m.body}</p>
                </div>
                <div className="fs-11 text-muted mt-1">{dayjs(ts).format('HH:mm DD.MM.YYYY')}</div>
              </li>
            )
          })}
          <div ref={bottomRef} />
        </ul>
      </SimpleBar>

      <div className="chat-footer d-flex align-items-center p-2 border-top">
        <button className="btn btn-icon btn-sm btn-outline-light me-2">
          <i className="ti ti-paperclip" />
        </button>
        <div className="position-relative me-2">
          <button className="btn btn-icon btn-sm btn-outline-light" onClick={() => setShowEmoji(v => !v)}>
            <i className="ti ti-mood-smile" />
          </button>
          {showEmoji && (
            <div className="position-absolute bottom-100 z-3">
              <EmojiPicker onEmojiClick={(_, emoji) => setText(t => t + emoji.emoji)} />
            </div>
          )}
        </div>
        <Form.Control
          type="text"
          placeholder="Mesaj yazın…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="me-2"
        />
        <button className="btn btn-icon btn-primary" onClick={handleSend}>
          <i className="ti ti-send" />
        </button>
      </div>
    </div>
  )
}
