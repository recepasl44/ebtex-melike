import React, { useEffect, useRef, useState } from 'react';
import { Offcanvas, Button, InputGroup, Form } from 'react-bootstrap';
import SimpleBar from 'simplebar-react';
import EmojiPicker from 'emoji-picker-react';
import dayjs from 'dayjs';
import axiosInstance from '../../../../../services/axiosClient';
import { ChatMessage, ChatUser } from './types';

interface Props {
  conversationId: string;
  currentUserId: string;
  user: ChatUser;
}

const formatTime = (iso: string) => dayjs(iso).format('HH:mm');

const Chat: React.FC<Props> = ({ conversationId, currentUserId, user }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messageText, setMessageText] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const fetchMessages = async () => {
    try {
      const resp = await axiosInstance.get(`/conversations/${conversationId}/messages`);
      setMessages(resp.data || []);
    } catch (err) {
      // ignore for now
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [conversationId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    const text = messageText.trim();
    if (!text) return;
    try {
      await axiosInstance.post(`/conversations/${conversationId}/messages`, { text });
      setMessageText('');
      await fetchMessages();
    } catch (err) {
      // handle error silently
    }
  };

  return (
    <div className="main-chat-area flex-grow-1">
      <div className="main-chat-head d-flex align-items-center justify-content-between p-2 border-bottom">
        <div className="d-flex align-items-center">
          <img src={user.imageUrl} className="avatar avatar-md me-2" />
          <div>
            <p className="mb-0 fw-medium">{user.name}</p>
            <span className="fs-11 text-muted">{user.status}</span>
          </div>
        </div>
        <div className="d-flex gap-2">
          <Button variant="light" className="btn-icon" onClick={() => setShowInfo(true)}>
            <i className="ti ti-info-circle" />
          </Button>
        </div>
      </div>
      <SimpleBar className="chat-content px-3" style={{ maxHeight: 500 }}>
        <ul className="list-unstyled mb-0">
          {messages.map((msg) => (
            <li
              key={msg.id}
              className={msg.senderId === currentUserId ? 'chat-item-end mb-2' : 'chat-item-start mb-2'}
            >
              <div className="main-chat-msg">
                <p>{msg.text}</p>
              </div>
              <span className="msg-sent-time">{formatTime(msg.timestamp)}</span>
            </li>
          ))}
          <div ref={bottomRef} />
        </ul>
      </SimpleBar>
      <div className="chat-footer p-2 border-top">
        {showPicker && (
          <div className="mb-2">
            <EmojiPicker onEmojiClick={(e) => setMessageText((t) => t + e.emoji)} />
          </div>
        )}
        <InputGroup>
          <Button variant="light" className="btn-icon">
            <i className="ti ti-paperclip" />
          </Button>
          <Button variant="light" className="btn-icon" onClick={() => setShowPicker((s) => !s)}>
            <i className="ti ti-mood-smile" />
          </Button>
          <Form.Control
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Mesaj yazın…"
          />
          <Button variant="primary" onClick={handleSend} className="btn-icon">
            <i className="ti ti-send" />
          </Button>
        </InputGroup>
      </div>

      <Offcanvas show={showInfo} onHide={() => setShowInfo(false)} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{user.name}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="text-center">
            <img src={user.imageUrl} className="avatar avatar-xl mb-3" />
            <p>Status: {user.status}</p>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default Chat;
