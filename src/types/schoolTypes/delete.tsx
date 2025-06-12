import SchoolTypeListStatus from "../../enums/schoolTypes/list";

export interface SchoolTypeDeleteState {
    data: number | null;
    status: SchoolTypeListStatus;
    error: string | null;
}

export interface SchoolTypeDeleteResponse {
    success: boolean;
    message: string;
}
