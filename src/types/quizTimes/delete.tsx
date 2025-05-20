import { QuizTimeListStatus } from "../../enums/quizTimes/list";

export interface QuizTimeDeleteState {
    data: number | null;
    status: QuizTimeListStatus;
    error: string | null;
}

export interface QuizTimeDeleteResponse {
    success: boolean;
    message: string;
}
