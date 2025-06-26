import React, { useEffect, useRef, useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import SimpleBar from "simplebar-react";
import { useMessagesList } from "../../../../hooks/messages/useList";
import { useMessageAdd } from "../../../../hooks/messages/useAdd";
import { ChatUser } from "../../../../../types/messages/list";

interface Props {
  conversationId: string;
  currentUserId: string;
  user: ChatUser;
}

interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

const Chat: React.FC<Props> = ({ conversationId, currentUserId, user }) => {
  const { messagesData = [], loading } = useMessagesList({
    enabled: !!conversationId,
    conversation_id: Number(conversationId),
    page: 1,
    pageSize: 50,
  });

  const { addNewMessage } = useMessageAdd();
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const chatRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mapped = messagesData.map((m): ChatMessage => ({
      id: String(m.id),
      senderId: String(m.sender_id),
      text: m.body,
      timestamp: (m as any).created_at || "",
    }));
    setMessages(mapped);
  }, [messagesData]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!text.trim()) return;
    const optimistic: ChatMessage = {
      id: `temp-${Date.now()}`,
      senderId: currentUserId,
      text,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, optimistic]);
    await addNewMessage({
      conversation_id: Number(conversationId),
      sender_id: Number(currentUserId),
      body: text,
    });
    setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="main-chat-area border position-relative flex-fill">
      <div className="main-chat-head d-flex align-items-center border-bottom">
        <div className="d-flex align-items-center">
          <span className="avatar avatar-md avatar-rounded me-2">
            <img src={user.imageUrl} alt="" />
          </span>
          <div>
            <div className="chatnameperson">{user.name}</div>
            <span className="fs-12 text-muted">{user.status}</span>
          </div>
        </div>
      </div>
      <SimpleBar className="chat-content" scrollableNodeProps={{ ref: chatRef }}>
        <ul className="list-unstyled mb-0">
          {loading && (
            <li className="text-center py-4">
              <Spinner animation="border" size="sm" />
            </li>
          )}
          {messages.map((msg) => (
            <li
              key={msg.id}
              className={msg.senderId === currentUserId ? "chat-item-end" : "chat-item-start"}
            >
              <div className="chat-list-inner">
                <div className="main-chat-msg">
                  <div>
                    <p className="mb-0">{msg.text}</p>
                  </div>
                  <span className="msg-sent-time">{msg.timestamp}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </SimpleBar>
      <div className="chat-footer">
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
    </div>
  );
};

export default Chat;
