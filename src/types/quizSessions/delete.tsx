import { QuizSessionListStatus } from "../../enums/quizSessions/list";

export interface QuizSessionDeleteState {
    data: number | null;
    status: QuizSessionListStatus;
    error: string | null;
}

export interface QuizSessionDeleteResponse {
    success: boolean;
    message: string;
}
