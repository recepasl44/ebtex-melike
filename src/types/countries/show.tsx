import { ICountry } from './list';
import CountryListStatus from '../../enums/countries/list';

export interface CountryShowState {
    data: ICountry | null;
    status: CountryListStatus;
    error: string | null;
}
