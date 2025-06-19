import { QuizTimeListStatus } from "../../enums/quizTimes/list";
import { IQuizTime } from "./list";

export interface IQuizTimeAddPayload {
    session_id: number;
    session_hour: number;
    session_minute: number;
    session_second: number;
}


export interface QuizTimeAddState {
    data: IQuizTime | null;
    status: QuizTimeListStatus;
    error: string | null;
}


export interface QuizTimeAddResponse {
    data: IQuizTime;
}
