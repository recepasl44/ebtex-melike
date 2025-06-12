// src/types/schoolTypes/list.ts

import { SchoolTypeListStatus } from "../../enums/schoolTypes/list";

export interface ISchoolType {
    id: number;
    name: string;
}

export interface SchoolTypeListMeta {
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
    from: number;
    to: number;
}

export interface SchoolTypesListResponse {
    data: ISchoolType[];
    meta: SchoolTypeListMeta;
    links?: any;
}


export interface SchoolTypeListState {
    data: ISchoolType[] | null;
    meta: SchoolTypeListMeta | null;
    status: SchoolTypeListStatus;
    error: string | null;
}


export interface SchoolTypeListArg {
    enabled?: boolean;
    [key: string]: any;
}
