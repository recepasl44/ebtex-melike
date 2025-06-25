import React, { useState } from "react";
import { Form, Offcanvas, Spinner, Button } from "react-bootstrap";
import SimpleBar from "simplebar-react";
import EmojiPicker from "emoji-picker-react";
import dayjs from "dayjs";
import { useMessagesList } from "../../../../hooks/messages/useList";
import { useMessageAdd } from "../../../../hooks/messages/useAdd";
interface ChatUser {
  id: string;
  name: string;
  imageUrl: string;
  status: string;
  isGroup?: boolean;
  lastMessage?: string;
  lastTimestamp?: string;
}

interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

interface Props {
  conversationId: string;
  currentUserId: string;
  user: ChatUser;
}

const Chat: React.FC<Props> = ({ conversationId, currentUserId, user }) => {
  const {
    messagesData = [],
    loading: isLoading,
    refetch,

  } = useMessagesList({
    enabled: Boolean(conversationId),
    conversation_id: Number(conversationId),
    page: 1,
    pageSize: 50,
  });
  const { addNewMessage } = useMessageAdd();
  const [text, setText] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const handleSend = async () => {
    if (!text.trim()) return;
    await addNewMessage({
      conversation_id: Number(conversationId),
      sender_id: Number(currentUserId),
      body: text,
    });
    setText('');
    setShowEmoji(false);
    refetch();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="main-chat-area border position-relative flex-fill">
      <div className="main-chat-head d-flex align-items-center justify-content-between border-bottom">
        <div className="d-flex align-items-center">
          <span className="avatar avatar-md avatar-rounded me-2">
            <img src={user.imageUrl} alt="" />
          </span>
          <div>
            <div className="chatnameperson">{user.name}</div>
            <span className="fs-12 text-muted">{user.status}</span>
          </div>
        </div>
        <button className="btn btn-icon btn-sm btn-outline-light" onClick={() => setShowInfo(true)}>
          <i className="ti ti-info-circle" />
        </button>
      </div>
      <SimpleBar className="chat-content">
        <ul className="list-unstyled mb-0">
          {isLoading && (
            <li className="text-center py-4">
              <Spinner animation="border" size="sm" />
            </li>
          )}
          {messagesData.map((m): ChatMessage => ({
            id: String(m.id),
            senderId: String(m.sender_id),
            text: m.body,
            timestamp: (m as any).created_at || "",
          })).map((msg: ChatMessage) => (
            <li key={msg.id} className={msg.senderId === currentUserId ? 'chat-item-end' : 'chat-item-start'}>
              <div className="chat-list-inner">
                <div className="main-chat-msg">
                  <div>
                    <p className="mb-0">{msg.text}</p>
                  </div>
                  <span className="msg-sent-time">{dayjs(msg.timestamp).format('HH:mm')}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </SimpleBar>
      <div className="chat-footer">
        <button className="btn btn-icon btn-sm btn-outline-light me-2">
          <i className="ti ti-paperclip" />
        </button>
        <div className="position-relative me-2">
          <button className="btn btn-icon btn-sm btn-outline-light" onClick={() => setShowEmoji(!showEmoji)}>
            <i className="ti ti-mood-smile" />
          </button>
          {showEmoji && (
            <div className="position-absolute bottom-100 z-3">
              <EmojiPicker onEmojiClick={(e) => setText((t) => t + e.emoji)} />
            </div>
          )}
        </div>
        <Form.Control
          type="text"
          className="flex-fill me-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Mesaj yaz..."
        />
        <button className="btn btn-icon btn-primary btn-send" onClick={handleSend}>
          <i className="ri-send-plane-2-line" />
        </button>
      </div>
      <Offcanvas placement="end" show={showInfo} onHide={() => setShowInfo(false)} className="chat-user-details">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{user.name}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="text-center">
            <span className="avatar avatar-xl avatar-rounded mb-2">
              <img src={user.imageUrl} alt="" />
            </span>
            <p className="mb-0 fw-semibold">{user.name}</p>
            <p className="text-muted fs-12">{user.status}</p>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default Chat;

