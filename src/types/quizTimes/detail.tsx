
import { QuizTimeListStatus } from "../../enums/quizTimes/list";
import { IQuizTime } from "./list";

export interface ShowQuizTimeParams {
    id: number;
}

export interface ShowQuizTimeResponse {
    data: IQuizTime;
}

export interface QuizTimeShowState {
    data: IQuizTime | null;
    status: QuizTimeListStatus;
    error: string | null;
}
