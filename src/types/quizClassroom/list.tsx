

import { QuizClassroomListStatus } from "../../enums/quizClassroom/list";

export interface Classroom {
    id: number;
    name: string;
    level_id: number;
    created_at: string;
    updated_at: string;
}

export interface QuizClassroom {
    id: number;
    quiz_id: number | null;
    quiz: any | null;
    quiz_type: any | null;
    classroom_id: number;
    classroom: Classroom | null;
    quiz_level_id: number | null;
    name: string | null;
    quota: number | null;
    ordered: number | null;
    created_at: string;
    updated_at: string;
}


export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}


export interface PaginationLinks {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
}

export interface QuizClassroomListMeta {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
    path?: string;
    links?: PaginationLink[];
}


export interface QuizClassroomsListResponse {
    data: QuizClassroom[];
    links: PaginationLinks;
    meta: QuizClassroomListMeta;
}


export interface QuizClassroomListState {
    data: QuizClassroom[] | null;
    links: PaginationLinks | null;
    meta: QuizClassroomListMeta | null;
    status: QuizClassroomListStatus;
    error: string | null;
}

export interface QuizClassroomListArg {
    enabled?: boolean;
    quiz_id?: number;
    quiz_level_id?: number;
    classroom_id?: number;
    level_id?: number;
    paginate?: number;
    page?: number;
    pageSize?: number;
    [key: string]: any;
}
