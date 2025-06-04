
import { IClassroom } from "./list";
import ClassroomListStatus from "../../enums/classroom/list";


export interface ClassroomAddPayload {
    name: string;
    level_id: number;
    branche_id: number;
    season_id: number;
    created_by: number;
}

export interface ClassroomAddState {
    data: IClassroom | null;
    status: ClassroomListStatus;
    error: string | null;
}

export interface ClassroomAddResponse {
    data: IClassroom;
}
