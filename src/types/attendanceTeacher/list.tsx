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
    created_at: string | null
    updated_at: string | null
    platform_id: number
}

export interface Teacher {
    id: number
    personel_id: number
    name_surname: string
    short_name: string
    branch: string
    class_teacher_id: number
    social_club: string
    email: string
    created_at: string | null
    updated_at: string | null
}

export interface Data {
    id: number
    attendance_id: number
    attendance: Attendance | null
    teacher_id: number
    teacher: Teacher | null
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

export interface ListAttendanceTeachersResponse {
    data: Data[]
    links: Links
    meta: Meta
}

export interface AttendanceTeachersListArg {
    enabled?: boolean
    [key: string]: any
}
