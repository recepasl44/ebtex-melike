

import { SchoolTypeListStatus } from "../../enums/schoolTypes/list";
import { ISchoolType } from "./list";

export interface ISchoolTypeAddPayload {
    name: string;
}

export interface SchoolTypeAddState {
    data: ISchoolType | null;
    status: SchoolTypeListStatus;
    error: string | null;
    name: string;
}

export interface SchoolTypeAddResponse {
    data: ISchoolType;
}
