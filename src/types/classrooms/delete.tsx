import ClassroomListStatus from "../../enums/classroom/list";

export interface ClassroomDeleteState {
    data: number | null;
    status: ClassroomListStatus;
    error: string | null;
}
