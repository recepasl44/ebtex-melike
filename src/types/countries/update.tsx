import { ICountry } from './list';
import CountryListStatus from '../../enums/countries/list';

export interface CountryUpdatePayload {
    countryId: number;
    payload: {
        name: string;
    };
}

export interface CountryUpdateState {
    data: ICountry | null;
    status: CountryListStatus;
    error: string | null;
}
