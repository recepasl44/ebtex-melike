
import { QuizLevelListStatus } from "../../enums/quizLevels/list";

export interface QuizLevelDeleteState {
    data: number | null;
    status: QuizLevelListStatus;
    error: string | null;
}

export interface QuizLevelDeleteResponse {
    success: boolean;
    message: string;
}
