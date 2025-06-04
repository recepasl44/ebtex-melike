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

export interface Student {
    id: number
    register_no: number
    branche_id: number
    season_id: number
    nationality_id: number
    identification_no: string
    gender_id: number
    first_name: string
    last_name: string
    status: number
    birthday: string
    program_id: number
    level_id: number
    course_id: number
    school_id: number
    email: string
    phone: string
    mobile_phone: string
    blood_type: string
    illness: string | null
    address_id: number
    parent_id: number
    financial_status: string
    additional_information_1: string
    additional_information_2: string
    class_teacher: string | null
    advisor_teacher: string | null
    guide_teacher: string | null
    profile_picture: string
    created_by: number
    created_at: string
    updated_at: string
    platform_id: number
    student_no: number
    class_teacher_id: number | null
    advisor_teacher_id: number | null
    guide_teacher_id: number | null
}

export interface Data {
    last_name: string
    name_surname: any
    first_name: string
    name: any
    id: number
    attendance_id: number
    attendance: Attendance | null
    student_id: number
    student: Student | null
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

export interface ListAttendanceStudentsResponse {
    data: Data[]
    links: Links
    meta: Meta
}

export interface AttendanceStudentsListArg {
    enabled?: boolean
    [key: string]: any
}
