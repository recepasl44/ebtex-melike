
import { QuizClassroomListStatus } from "../../enums/quizClassroom/list";
import { QuizClassroom } from "./list";

export interface QuizClassroomDetailParams {
    id: number;
}

export interface QuizClassroomDetailResponse {
    data: QuizClassroom;
}

export interface QuizClassroomDetailState {
    data: QuizClassroom | null;
    status: QuizClassroomListStatus;
    error: string | null;
}
