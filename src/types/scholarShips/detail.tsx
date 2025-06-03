
import { ScholarShipsListStatus } from "../../enums/scholarShips/list";

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
    branche: any | null;
    season_id: number;
    season: ISeason;
    duration: number;
    created_by: number;
    status: number;
}

export interface ScholarShipDetailParams {
    id: number;
}


export interface ScholarShipDetailResponse {
    data: IScholarShip;
}

export interface ScholarShipDetailState {
    data: IScholarShip | null;
    status: ScholarShipsListStatus;
    error: string | null;
}
