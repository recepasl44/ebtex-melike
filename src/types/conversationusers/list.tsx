// file: src/types/conversationusers/list.tsx
export interface ConversationUsersConversation {
    id: number
    name: string
    type_id: number
    user_one_id: number
    user_two_id: number
    created_at: string | null
    updated_at: string | null
    platform_id: number
}

export interface ConversationUsersUser {
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

export interface ConversationUsersData {
    id: number
    conversation_id: number
    conversation: ConversationUsersConversation
    user_id: number
    user: ConversationUsersUser
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

export interface ListConversationUsersResponse {
    data: ConversationUsersData[]
    links: ListLinks
    meta: ListMeta
}

export interface ListConversationUserArg {
    enabled?: boolean
    [key: string]: any
}
