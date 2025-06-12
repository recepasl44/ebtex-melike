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


export interface IQuizSessionUpdatePayload {
    quizSessionId: number;
    payload: {
        type_id: number;
        quiz_id: number;
        branche_id: number;
        session_date: string;
    };
}


export interface QuizSessionUpdateState {
    data: IQuizSession | null;
    status: QuizSessionListStatus;
    error: string | null;
}


export interface QuizSessionUpdateResponse {
    data: IQuizSession;
}
