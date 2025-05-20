

import { QuizLevelListStatus } from "../../enums/quizLevels/list";
import { QuizLevel } from "./list";


export interface IQuizLevelAddPayload {
    level_id: number;
    type_id: number;
    quiz_id?: number | null;
    time_id?: number | null;
}

export interface QuizLevelAddResponse {
    data: QuizLevel;
}

export interface QuizLevelAddState {
    data: QuizLevel | null;
    status: QuizLevelListStatus;
    error: string | null;
}
