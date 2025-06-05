export interface TeacherData {
    id: number;
    personel_id: number;
    name_surname: string;
    short_name: string;
    branch: string;
    class_teacher_id: number;
    social_club: string;
    email: string;
    created_at?: string | null;
    updated_at?: string | null;
    personel?: any;
    lesson_class?: any;
}

export interface TeacherMeta {
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

export interface ListTeacherResponse {
    data: TeacherData[];
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
    meta: TeacherMeta;
}

export interface TeacherListArg {
    enabled?: boolean;
    [key: string]: any;
}
