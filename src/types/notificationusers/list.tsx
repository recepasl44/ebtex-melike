// file: src/types/notificationusers/list.tsx
export interface NotificationUsersNotification {
    id: number
    title: string | null
    message: string
    user_id: number
    type_id: number
    group_id: number | null
    category_id: number | null
    source_id: number | null
    sender_id: number | null
    send_time: string
    type: number
    is_read: number
    status: number
    created_at: string
    updated_at: string | null
    platform_id: number
}

export interface NotificationUsersUser {
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

export interface NotificationUsersData {
    id: number
    notification_id: number
    notification: NotificationUsersNotification
    user_id: number
    user: NotificationUsersUser
    read_at: string | null
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

export interface ListNotificationUsersResponse {
    data: NotificationUsersData[]
    links: ListLinks
    meta: ListMeta
}

export interface ListNotificationUserArg {
    enabled?: boolean
    [key: string]: any
}
