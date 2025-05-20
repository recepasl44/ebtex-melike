import { QuizSessionListStatus } from "../../enums/quizSessions/list";

export interface IQuizSession {
    id: number;
    type_id: number;
    quiz_type: any;
    quiz_id: number;
    quiz: any;
    branche_id: number;
    session_date: string;
    sessions: any[];
}

export interface QuizSessionListMeta {
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
    from: number;
    to: number;
    path: string;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}


export interface QuizSessionListLinks {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
}


export interface QuizSessionsListResponse {
    data: IQuizSession[];
    meta: QuizSessionListMeta;
    links: QuizSessionListLinks;
}


export interface QuizSessionListState {
    data: IQuizSession[] | null;
    meta: QuizSessionListMeta | null;
    status: QuizSessionListStatus;
    error: string | null;
}


export interface QuizSessionListArg {
    enabled?: boolean;
    [key: string]: any;
}
