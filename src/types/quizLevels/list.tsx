// types/quizLevels/list.ts

import { QuizLevelListStatus } from "../../enums/quizLevels/list"; // Bu enum'u sen tanımlamalısın

export interface Level {
    id: number;
    program_id: number;
    name: string;
    created_at: string;
    updated_at: string;
    platform_id: number;
}

export interface QuizLevel {
    id: number;
    level_id: number;
    level: Level | null;
    quiz_id: number | null;
    type_id: number;
    time_id: number | null;
    quiz: any;
    classrooms: any[];
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

export interface QuizLevelListMeta {
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
    from: number;
    to: number;
    path?: string;
    links?: PaginationLink[];
}

export interface QuizLevelsListResponse {
    data: QuizLevel[];
    meta: QuizLevelListMeta;
    links: PaginationLinks;
}


export interface QuizLevelListState {
    data: QuizLevel[] | null;
    meta: QuizLevelListMeta | null;
    status: QuizLevelListStatus;
    error: string | null;
}

export interface QuizLevelListArg {
    enabled?: boolean;
    quiz_id?: number;
    branche_id?: number;
    session_id?: number;
    paginate?: number;
    page?: number;
    pageSize?: number;
    filter?: any;
    [key: string]: any;
    level_id?: number;

}
