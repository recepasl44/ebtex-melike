// file: src/types/messages/list.tsx
export interface MessageConversation {
    id: number
    name: string
    type_id: number
    user_one_id: number
    user_two_id: number
    created_at: string | null
    updated_at: string | null
    platform_id: number
}

export interface MessageSender {
    id: number
    first_name: string
    last_name: string
    email: string
    username: string | null
    status: number
    confirmation_code: string
    confirmed: number
    is_term_accept: number
    profile_img: string | null
    cover: string | null
    bio: string | null
    country_id: number | null
    city_id: number | null
    timezone_id: number | null
    lang_id: number | null
    created_by: number
    updated_by: number | null
    created_at: string
    updated_at: string
    deleted_at: string | null
    platform_id: number
}

export interface MessageData {
    id: number
    conversation_id: number
    conversation: MessageConversation
    sender_id: number
    sender: MessageSender
    body: string
    read_at: string | null
    status: number
}

export interface ListLinks {
    first: string
    last: string
    prev: string | null
    next: string | null
}

export interface ListMeta {
    current_page: number
    from: number
    last_page: number
    links: { url: string | null; label: string; active: boolean }[]
    path: string
    per_page: number
    to: number
    total: number
}

export interface ListMessagesResponse {
    data: MessageData[]
    links: ListLinks
    meta: ListMeta
}

export interface ListMessageArg {
    enabled?: boolean
    [key: string]: any
}
