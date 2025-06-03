import { ScholarShipsListStatus } from "../../enums/scholarShips/list"
export interface ISeason {
    id: number;
    name: string;
    former_id: number | null;
    created_at: string;
    updated_at: string;
    platform_id: number;
}


export interface IScholarShip {
    id: number;
    short_name: string;
    name: string;
    branche_id: number;
    branche: any;
    season_id: number;
    season: ISeason;
    duration: number;
    created_by: number;
    status: number;
}


export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}


export interface ScholarShipListMeta {
    current_page: number;
    from: number;
    last_page: number;
    links: PaginationLink[];
    path: string;
    per_page: number;
    to: number;
    total: number;
}


export interface PaginationLinks {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
}

export interface ScholarShipsListResponse {
    data: IScholarShip[];
    meta: ScholarShipListMeta;
    links: PaginationLinks;
}


export interface ScholarShipListState {
    data: IScholarShip[] | null;
    meta: ScholarShipListMeta | null;
    status: ScholarShipsListStatus;
    error: string | null;
}

export interface ScholarShipListArg {
    enabled?: boolean;
    [key: string]: any;
}
