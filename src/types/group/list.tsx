export interface data {
    id: number
    name: string
}

export interface links {
    first: string
    last: string
    prev: string | null
    next: string | null
}

export interface meta {
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

export interface ListGroupsResponse {
    data: data[]
    links: links
    meta: meta
}

export interface GroupsListArg {
    enabled?: boolean
    [key: string]: any
}
