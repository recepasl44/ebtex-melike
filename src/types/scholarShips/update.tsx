import { ScholarShipsListStatus } from "../../enums/scholarShips/list";
import { IScholarShip } from "./list";

export interface IScholarShipUpdatePayload {
    scholarShipId: number;
    payload: {
        short_name: string;
        name: string;
        branche_id: number;
        season_id: number;
        duration: number;
        status: number;
    };
}

export interface ScholarShipUpdateResponse {
    data: IScholarShip;
}

export interface ScholarShipUpdateState {
    data: IScholarShip | null;
    status: ScholarShipsListStatus;
    error: string | null;
}
