

import { QuizLevelListStatus } from "../../enums/quizLevels/list";
import { QuizLevel } from "./list";


export interface IQuizLevelUpdatePayload {
    quizLevelId: number;
    payload: {
        level_id: number;
        type_id: number;
        quiz_id?: number | null;
        time_id?: number | null;
    };
}


export interface QuizLevelUpdateResponse {
    data: QuizLevel;
}


export interface QuizLevelUpdateState {
    data: QuizLevel | null;
    status: QuizLevelListStatus;
    error: string | null;
}
