import { useState } from 'react'
import Conversations from './conversations'
import Chat from './chat'
import { MessageConversation } from '../../../../../types/messages/list'

interface Props { currentUserId: string }

export default function MessagesIndex({ currentUserId }: Props) {
  const [activeConversation, setActiveConversation] = useState<(MessageConversation & { avatarUrl?: string; status?: 'online' | 'offline' }) | null>(null)

  return (
    <div className="main-chart-wrapper d-lg-flex gap-2">
      <Conversations
        onSelect={(conv: MessageConversation) => {
          setActiveConversation({ ...conv, avatarUrl: '', status: 'online' })
        }}
      />
      {activeConversation && (
        <Chat
          conversationId={String(activeConversation.id)}
          currentUserId={currentUserId}
          user={activeConversation}
        />
      )}
    </div>
  )
}
