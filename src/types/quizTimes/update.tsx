import { QuizTimeListStatus } from "../../enums/quizTimes/list";
import { IQuizTime } from "./list";


export interface IQuizTimeUpdatePayload {
    quizTimeId: number;
    payload: {
        session_id: number;
        session_hour: number;
        session_minute: number;
        session_second: number;
    };
}

export interface QuizTimeUpdateState {
    data: IQuizTime | null;
    status: QuizTimeListStatus;
    error: string | null;
}


export interface QuizTimeUpdateResponse {
    data: IQuizTime;
}
