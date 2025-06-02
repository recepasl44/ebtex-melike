import { QuizSessionListStatus } from "../../enums/quizSessions/list";
import { IQuizSession } from "./list";

export interface ShowQuizSessionParams {
    id: number;
}

export interface ShowQuizSessionResponse {
    data: IQuizSession;
}

export interface QuizSessionShowState {
    data: IQuizSession | null;
    status: QuizSessionListStatus;
    error: string | null;
}
