import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { UNITS } from '../../../helpers/url_helper';
import { UnitsAddPayload } from '../../../types/units/add';
import { data } from '../../../types/units/list';

export const addUnit = createAsyncThunk<data, UnitsAddPayload>(
    'units/addUnit',
    async (payload, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.post(UNITS, payload);
            return resp.data.data as data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Add unit failed');
        }
    }
);
