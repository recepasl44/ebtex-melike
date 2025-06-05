import { QuizClassroomListStatus } from "../../enums/quizClassroom/list";
import { QuizClassroom } from "./list";


export interface IQuizClassroomUpdatePayload {
    quizClassroomId: number;
    payload: {
        scholarship_id: number;
        classroom_id?: number;
        name?: string | null;
        quota?: number | null;
        ordered?: number | null;
    };
}


export interface QuizClassroomUpdateResponse {
    data: QuizClassroom;
}

export interface QuizClassroomUpdateState {
    data: QuizClassroom | null;
    status: QuizClassroomListStatus;
    error: string | null;
}
