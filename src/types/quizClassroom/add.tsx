import { QuizClassroomListStatus } from "../../enums/quizClassroom/list";
import { QuizClassroom } from "./list";


export interface IQuizClassroomAddPayload {
    type_id: number;
    classroom_id: number;
    quota?: number | null;
}

export interface QuizClassroomAddResponse {
    data: QuizClassroom;
}

export interface QuizClassroomAddState {
    data: QuizClassroom | null;
    status: QuizClassroomListStatus;
    error: string | null;
}
