
import { QuizLevelListStatus } from "../../enums/quizLevels/list";
import { QuizLevel } from "./list";

export interface QuizLevelDetailParams {
    id: number;
}

export interface QuizLevelDetailResponse {
    data: QuizLevel;
}

export interface QuizLevelDetailState {
    data: QuizLevel | null;
    status: QuizLevelListStatus;
    error: string | null;
}
