import { useEffect, useRef, useState } from 'react'
import { Button, Form, Offcanvas, Spinner } from 'react-bootstrap'
import SimpleBar from 'simplebar-react'
import EmojiPicker from 'emoji-picker-react'
import dayjs from 'dayjs'
import { useMessagesList } from '../../../../hooks/messages/useList'
import { useMessageAdd } from '../../../../hooks/messages/useAdd'
import { ChatUser } from '../../../../../types/messages/chat'

interface Props {
  conversationId: string
  currentUserId: string
  user: ChatUser
}

export default function Chat({ conversationId, currentUserId, user }: Props) {
  const {
    messagesData = [],
    loading,
    error,
    refetch,
  } = useMessagesList({
    enabled: Boolean(conversationId),
    conversation_id: +conversationId,
    page: 1,
    pageSize: 50,
  })

  const { addNewMessage } = useMessageAdd()

  const [text, setText] = useState('')
  const [showEmoji, setShowEmoji] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  const handleSend = async () => {
    if (!text.trim()) return
    await addNewMessage({
      conversation_id: +conversationId,
      sender_id: +currentUserId,
      body: text,
    })
    setText('')
    setShowEmoji(false)
    refetch()
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messagesData, conversationId])

  return (
    <div className="main-chat-area border position-relative flex-fill">
      <div className="main-chat-head d-flex align-items-center justify-content-between border-bottom p-3">
        <div className="d-flex align-items-center">
          <span className="avatar avatar-md me-2">
            <img src={user.imageUrl} alt="" />
          </span>
          <div>
            <p className="mb-0 fw-medium">{user.name}</p>
            <span className="fs-11 text-muted">{user.status}</span>
          </div>
        </div>
        <Button variant="light" className="btn-icon" onClick={() => setShowInfo(true)}>
          <i className="ti ti-info-circle" />
        </Button>
      </div>

      <SimpleBar className="chat-content">
        <ul className="list-unstyled mb-0">
          {loading && (
            <li className="text-center py-4">
              <Spinner animation="border" size="sm" />
            </li>
          )}
          {error && <li className="text-danger text-center">Yükleme hatası</li>}
          {messagesData.map((m: any) => (
            <li key={m.id} className={m.sender_id === +currentUserId ? 'chat-item-end' : 'chat-item-start'}>
              <div className="main-chat-msg">
                <p>{m.body}</p>
              </div>
              <span className="msg-sent-time">{dayjs(m.timestamp || m.created_at).format('HH:mm')}</span>
            </li>
          ))}
          <div ref={bottomRef} />
        </ul>
      </SimpleBar>

      <div className="chat-footer d-flex align-items-center p-2 gap-1">
        <Button variant="light" className="btn-icon">
          <i className="ti ti-paperclip" />
        </Button>
        <div className="position-relative">
          <Button variant="light" className="btn-icon" onClick={() => setShowEmoji(!showEmoji)}>
            <i className="ti ti-mood-smile" />
          </Button>
          {showEmoji && (
            <div className="position-absolute bottom-100 z-3">
              <EmojiPicker onEmojiClick={(e) => setText((t) => t + e.emoji)} autoFocusSearch={false} />
            </div>
          )}
        </div>
        <Form.Control
          className="flex-fill"
          placeholder="Mesaj yazın…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              handleSend()
            }
          }}
        />
        <Button className="btn-icon" onClick={handleSend} variant="primary">
          <i className="ti ti-send" />
        </Button>
      </div>

      <Offcanvas placement="end" show={showInfo} onHide={() => setShowInfo(false)} className="chat-user-details">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{user.name}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="text-center mb-3">
            <span className="avatar avatar-md">
              <img src={user.imageUrl} alt="" />
            </span>
            <p className="mb-0 fw-medium mt-2">{user.name}</p>
            <p className="fs-11 text-muted">{user.status}</p>
          </div>
          <h6 className="fw-semibold mb-2">Paylaşılan Dosyalar</h6>
          <div className="mb-4">{/* dosyalar placeholder */}</div>
          <h6 className="fw-semibold mb-2">Medya</h6>
          <div>{/* medya placeholder */}</div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}
