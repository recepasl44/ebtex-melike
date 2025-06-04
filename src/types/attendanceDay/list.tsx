export interface Attendance {
    id: number
    name: string
    group_type_id: number
    group_id: number
    program_id: number
    level_id: number
    start_date: string
    end_date: string
    start_time: string
    used_area_id: number
    status: number
    created_at: string
    updated_at: string
    platform_id: number
}

export interface Data {
    id: number
    attendance_id: number
    attendance: Attendance | null
    day_id: string
}

export interface Links {
    first: string
    last: string
    prev: string | null
    next: string | null
}

export interface Meta {
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

export interface ListAttendanceDaysResponse {
    data: Data[]
    links: Links
    meta: Meta
}

export interface AttendanceDaysListArg {
    enabled?: boolean
    [key: string]: any
}
