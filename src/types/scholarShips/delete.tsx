import { ScholarShipsListStatus } from "../../enums/scholarShips/list";


export interface ScholarShipDeleteState {
    data: number | null;
    status: ScholarShipsListStatus;
    error: string | null;
}

export interface ScholarShipDeleteResponse {
    success: boolean;
    message: string;
}
