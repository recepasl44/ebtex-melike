// src/types/classrooms/update.ts
import { IClassroom } from "./list";
import ClassroomListStatus from "../../enums/classroom/list";

export interface ClassroomUpdatePayload {
    classroomId: number;
    payload: {
        name: string;
        level_id: number;
        branche_id: number;
        season_id: number;
        created_by: number;
    };
}

export interface ClassroomUpdateState {
    data: IClassroom | null;
    status: ClassroomListStatus;
    error: string | null;
}

export interface ClassroomUpdateResponse {
    data: IClassroom;
}
