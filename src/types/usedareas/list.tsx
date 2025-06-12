export interface UsedArea {
    id: number
    name: string
}

export interface UsedAreasMeta {
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

export interface UsedAreasListResponse {
    data: UsedArea[]
    links: {
        first: string
        last: string
        prev: string | null
        next: string | null
    }
    meta: UsedAreasMeta
}

export interface UsedAreasListArg {
    enabled?: boolean
    [key: string]: any
}
