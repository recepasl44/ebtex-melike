import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { UNITS } from '../../../helpers/url_helper';
import { ListUnitResponse, UnitListArg } from '../../../types/units/list';

export const fetchUnits = createAsyncThunk<ListUnitResponse, UnitListArg>(
    'units/fetchUnits',
    async (queryParams, { rejectWithValue }) => {
        try {
            const query = new URLSearchParams();
            Object.entries(queryParams).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    query.append(key, String(value));
                }
            });
            const queryString = new URLSearchParams(queryParams).toString();
            const url = `${UNITS}?${queryString}`;
            const resp = await axiosInstance.get(url);
            return resp.data as ListUnitResponse;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Fetch units failed');
        }
    }
);
