// file: src/types/conversations/list.tsx
export interface ConversationUser {
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

export interface ConversationData {
    id: number
    name: string
    type_id: string
    user_one_id: number
    user_one: ConversationUser
    user_two_id: number
    user_two: ConversationUser
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
    links: {
        url: string | null
        label: string
        active: boolean
    }[]
    path: string
    per_page: number
    to: number
    total: number
}

export interface ListConversationsResponse {
    data: ConversationData[]
    links: ListLinks
    meta: ListMeta
}

export interface ListConversationArg {
    enabled?: boolean
    [key: string]: any
}
