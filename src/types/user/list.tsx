export interface Permission {
    id: number
    name: string
    display_name: string
    sort: number
    status: number
    created_by: number
    updated_by: number | null
    created_at: string
    updated_at: string
    deleted_at: string | null
    platform_id: number
    pivot?: {
        user_id: number
        permission_id: number
    }
}

export interface UserData {
    id: number
    first_name: string
    last_name: string
    email: string
    picture: string
    confirmed: number
    role: string
    permissions: Permission[]
    status: number
    directorate_id: number | null
    workshop_id: number | null
    created_at: string
    updated_at: string
}

export interface Links {
    first: string
    last: string
    prev: string | null
    next: string | null
}

export interface Meta {
    current_page: number
    from: number | null
    last_page: number
    links: {
        url: string | null
        label: string
        active: boolean
    }[]
    path: string
    per_page: number
    to: number | null
    total: number
}

export interface ListUsersResponse {
    data: UserData[]
    links: Links
    meta: Meta
}

export interface UsersListArg {
    enabled?: boolean
    [key: string]: any
}
