export interface Assignment {
    id: number;
    teacher_id: number;
    program_id: number;
    level_id: number;
    schooltype_id: number;
    course_id: number;
    class_section: string;
    subject: string;
    unit_topic: string;
    title: string;
    source_id: number;
    start_date: string;
    end_date: string;
    description: string | null;
    teacher_file: string | null;
    planned_status: number | null;
    status: number | null;
    teacher_planning_start_date: string | null;
    teacher_planning_end_date: string | null;
    special_permission: string | null;
    created_at: string | null;
    updated_at: string | null;
    platform_id: number;
}

export interface Student {
    id: number;
    register_no: number;
    branche_id: number;
    season_id: number;
    nationality_id: number;
    identification_no: string;
    gender_id: number;
    first_name: string;
    last_name: string;
    status: number;
    birthday: string;
    program_id: number;
    level_id: number;
    course_id: number;
    school_id: number;
    email: string;
    phone: string;
    mobile_phone: string | null;
    blood_type: string | null;
    illness: string | null;
    address_id: number;
    parent_id: number;
    financial_status: string;
    additional_information_1: string | null;
    additional_information_2: string | null;
    class_teacher: string | null;
    advisor_teacher: string | null;
    guide_teacher: string | null;
    profile_picture: string;
    created_by: number;
    created_at: string;
    updated_at: string;
    platform_id: number;
    student_no: number;
    class_teacher_id: number | null;
    advisor_teacher_id: number | null;
    guide_teacher_id: number | null;
}

export interface AssignmentStudentData {
    completion_rate: number;
    source_ids: never[];
    file_id: number | undefined;
    title: string;
    classroom_id: number;
    end_date: string;
    start_date: string;
    description: string;
    assignment_title: string;
    delivery_format: string;
    question_count: number;
    source_id: string;

    unit_id: number;
    lesson_id: number;
    level_id: number;
    branch_id: number;
    assignment: any;
    planned_status: any;
    id: number;
    assignment_id: number;
    assigment: Assignment;
    student_id: number;
    student: Student;
    completion_percentage: string;
    delay_days: number;
    student_file: string | null;
    status: number | null;
}

export interface AssignmentStudentsLinks {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
}

export interface AssignmentStudentsMeta {
    current_page: number;
    from: number;
    last_page: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export interface AssignmentStudentsListResponse {
    data: AssignmentStudentData[];
    links: AssignmentStudentsLinks;
    meta: AssignmentStudentsMeta;
}

export interface AssignmentStudentsListArg {
    enabled?: boolean;
    [key: string]: any;
}
