// file: src/types/notifications/list.tsx
export interface NotificationData {
    id: number
    type_id: number
    title: string | null
    message: string | null
    category_id: number | null
    source_id: number | null
    source: any | null
    sender_id: number | null
    sender: any | null
    send_time: string
    status: number
    group_id: number | null
    group: any | null
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

export interface ListNotificationsResponse {
    data: NotificationData[]
    links: ListLinks
    meta: ListMeta
}

export interface ListNotificationArg {
    enabled?: boolean
    [key: string]: any
}
