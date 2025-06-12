

import { SchoolTypeListStatus } from "../../enums/schoolTypes/list";
import { ISchoolType } from "./list";


export interface ShowSchooltypeParams {
    id: number;
}

export interface ShowSchooltypeResponse {
    data: ISchoolType;
}


export interface SchooltypeShowState {
    data: ISchoolType | null;
    status: SchoolTypeListStatus;
    error: string | null;
}

