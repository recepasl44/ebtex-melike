import { QuizTimeListStatus } from "../../enums/quizTimes/list";


export interface IQuizTime {
    id: number;
    session_id: number;
    session_hour: number;
    session_minute: number;
    session_second: number;
}

export interface QuizTimeListMeta {
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
    from: number;
    to: number;
}

export interface QuizTimeListLinks {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
}

export interface QuizTimesListResponse {
    data: IQuizTime[];
    meta: QuizTimeListMeta;
    links: QuizTimeListLinks | null;
}

export interface QuizTimeListState {
    data: IQuizTime[] | null;
    meta: QuizTimeListMeta | null;
    status: QuizTimeListStatus;
    error: string | null;
}

export interface QuizTimeListArg {
    enabled?: boolean;
    [key: string]: any;
}
