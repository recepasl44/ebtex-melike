import { CountryListStatus } from "../../enums/countries/list";


export interface CountryDeleteState {
    data: number | null;
    status: CountryListStatus;
    error: string | null;
}
