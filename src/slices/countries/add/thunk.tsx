import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';

import { COUNTRIES } from '../../../helpers/url_helper';
import { CountryAddPayload } from '../../../types/countries/add';
import { ICountry } from '../../../types/countries/list';

export const addCountry = createAsyncThunk<ICountry, CountryAddPayload>(
    'countries/addCountry',
    async (payload, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.post(COUNTRIES, payload);
            return resp.data.data as ICountry;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Add country failed');
        }
    }
);
