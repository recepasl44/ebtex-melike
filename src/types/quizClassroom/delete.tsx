
import { QuizClassroomListStatus } from "../../enums/quizClassroom/list";

export interface QuizClassroomDeleteState {
    data: number | null;
    status: QuizClassroomListStatus;
    error: string | null;
}

export interface QuizClassroomDeleteResponse {
    success: boolean;
    message: string;
}
