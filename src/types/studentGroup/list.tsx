export interface Data {
    id: number
    student_id: number
    group_id: number
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

export interface ListStudentGroupsResponse {
    data: Data[]
    links: Links
    meta: Meta
}

export interface StudentGroupsListArg {
    enabled?: boolean
    [key: string]: any
}
