export interface AssignmentData {
    question_count: number
    assignment: any

    unit_id: number
    lesson_id: number
    classroom_id: number
    id: number
    teacher_id: number
    teache: any
    program_id: number
    program: any
    level_id: number
    level: any
    schooltype_id: number
    schooltype: any
    course_id: number
    course: any
    class_section: string
    subject: string
    unit_topic: string
    title: string
    source_id: number
    source: any
    start_date: string
    end_date: string
    description: string | null
    teacher_file: string | null
    planned_status: number | null
    status: number | null
    teacher_planning_start_date: string | null
    teacher_planning_end_date: string | null
    special_permission: any
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

export interface ListAssignmentsResponse {
    data: AssignmentData[]
    links: ListLinks
    meta: ListMeta
}

export interface AssignmentListArg {
    enabled?: boolean
    [key: string]: any
}
