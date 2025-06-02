import { SchoolTypeListStatus } from "../../enums/schoolTypes/list";
import { ISchoolType } from "./list";

export interface ISchoolTypeUpdatePayload {
    schoolTypeId: number;
    payload: {
        name: string;
    };
}

export interface SchoolTypeUpdateState {
    data: ISchoolType | null;
    status: SchoolTypeListStatus;
    error: string | null;
}

export interface SchoolTypeUpdateResponse {
    data: ISchoolType;
}
