import React, { useEffect, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import SimpleBar from 'simplebar-react';
import EmojiPicker from 'emoji-picker-react';
import type { ChatUser, ChatMessage } from './types';
import { formatDate } from '../../../../utils/formatters';

interface Props {
  conversationId: string;
  currentUserId: string;
  user: ChatUser;
}

const ChatWindow: React.FC<Props> = ({ conversationId, currentUserId, user }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messageText, setMessageText] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    fetch(`/api/conversations/${conversationId}/messages`)
      .then((r) => r.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error('Messages load error', err));
  }, [conversationId]);

  const formatTimestamp = (ts: string) => formatDate(ts, true);

  const handleSend = async () => {
    if (!messageText.trim()) return;
    try {
      await fetch(`/api/conversations/${conversationId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: messageText }),
      });
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          senderId: currentUserId,
          text: messageText,
          timestamp: new Date().toISOString(),
        },
      ]);
      setMessageText('');
    } catch (err) {
      console.error('Message send error', err);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="main-chat-area d-flex flex-column h-100">
      <div className="main-chat-head border-bottom d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-2">
          <span className="avatar avatar-md avatar-rounded">
            <img src={user.image} alt={user.name} />
          </span>
          <div>
            <div className="chatnameperson">{user.name}</div>
            <span className="fs-10 text-muted">{user.status}</span>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-icon btn-sm btn-light"
          onClick={() => setShowInfo(true)}
        >
          <i className="ti ti-info-circle" />
        </button>
      </div>
      <SimpleBar className="chat-content flex-fill">
        <ul className="list-unstyled">
          {messages.map((msg) => (
            <li
              key={msg.id}
              className={msg.senderId === currentUserId ? 'chat-item-end' : 'chat-item-start'}
            >
              <div className="chat-list-inner">
                <div className="main-chat-msg">
                  <div>{msg.text}</div>
                  <div className="chatting-user-info">
                    <span className="msg-sent-time">{formatTimestamp(msg.timestamp)}</span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </SimpleBar>
      <div className="chat-footer w-100">
        <div className="input-group">
          <button
            type="button"
            className="btn btn-icon btn-light"
            onClick={() => setShowPicker(!showPicker)}
          >
            <i className="ti ti-mood-smile" />
          </button>
          <input
            type="text"
            className="form-control"
            placeholder="Mesaj yaz..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button type="button" className="btn btn-icon btn-primary" onClick={handleSend}>
            <i className="ti ti-send" />
          </button>
        </div>
        {showPicker && (
          <div className="position-absolute" style={{ bottom: '3rem', left: 0 }}>
            <EmojiPicker onEmojiClick={(emoji) => setMessageText((t) => t + emoji.emoji)} />
          </div>
        )}
      </div>
      <Offcanvas placement="end" show={showInfo} onHide={() => setShowInfo(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{user.name}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <p>Status: {user.status}</p>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default ChatWindow;
