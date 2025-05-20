export interface Group {
    id: number
    name: string
    created_at: string
    updated_at: string
    platform_id: number
}

export interface AttendanceDay {
    id: number
    attendance_id: number
    day_id: number
    created_at: string
    updated_at: string
    platform_id: number
}

export interface AttendanceStudentPivot {
    attendance_id: number
    student_id: number
}

export interface AttendanceStudent {
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
    class_teacher: string
    advisor_teacher: string
    guide_teacher: string | null
    profile_picture: string
    created_by: number
    created_at: string
    updated_at: string
    platform_id: number
    student_no: number
    class_teacher_id: number
    advisor_teacher_id: number
    guide_teacher_id: number
    pivot: AttendanceStudentPivot
}

export interface AttendanceTeacherPivot {
    attendance_id: number
    teacher_id: number
}

export interface AttendanceTeacher {
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
    pivot: AttendanceTeacherPivot
}

export interface AttendanceData {
    // Eklenmeyen ya da JSON'da olmayan alanları isterseniz opsiyonel tanımlayabilirsiniz
    manager_ids?: any
    time_range?: string
    week_days?: any[]
    classroom_id?: any
    area_id?: any
    club_name?: string
    late_count?: number
    absent_count?: number
    present_count?: number

    id: number
    name: string
    group_type_id: number
    group_type: any
    group_id: number
    group: Group | null
    program_id: number
    program: any
    level_id: number
    level: any
    start_date: string
    end_date: string
    start_time: string
    used_area_id: number | null
    used_area: any
    teacher_id?: number | null
    teacher?: any
    responsible_id?: number | null
    responsible?: any
    duty_teacher_id?: number | null
    duty_teacher?: any
    duty_user_id?: number | null
    duty_user?: any
    students: AttendanceStudent[]
    teachers: AttendanceTeacher[]
    days: AttendanceDay[]
    status: number
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

export interface ListAttendancesResponse {
    data: AttendanceData[]
    links: Links
    meta: Meta
}

export interface AttendancesListArg {
    enabled?: boolean
    [key: string]: any
}
