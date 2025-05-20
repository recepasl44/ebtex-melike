import { IClassroom } from "./list";
import ClassroomListStatus from "../../enums/classroom/list";

export interface ClassroomDetailState {
    name: string;
    quota: number;
    id: number;
    data: IClassroom | null;
    status: ClassroomListStatus;
    error: string | null;
}

export interface ClassroomDetailResponse {
    data: IClassroom;
}
