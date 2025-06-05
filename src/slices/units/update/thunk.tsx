import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { UNITS } from '../../../helpers/url_helper';
import { UnitsUpdatePayload } from '../../../types/units/update';
import { data } from '../../../types/units/list';

export const updateUnit = createAsyncThunk<data, UnitsUpdatePayload>(
    'units/updateUnit',
    async ({ unitId, payload }, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.put(`${UNITS}/${unitId}`, payload);
            return resp.data.data as data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Update unit failed');
        }
    }
);
