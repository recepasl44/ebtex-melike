

import { CountryListStatus } from "../../enums/countries/list";
import { ICountry } from "./list";

export interface CountryAddPayload {
    name: string;
    city_id: number;
}


export interface CountryAddResponse {
    data: ICountry;
}


export interface CountryAddState {
    data: ICountry | null;
    status: CountryListStatus;
    error: string | null;
}
