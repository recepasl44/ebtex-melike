import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { UNITS } from '../../../helpers/url_helper';
import { UnitsDeleteState } from '../../../types/units/delete';

export const deleteUnit = createAsyncThunk<UnitsDeleteState, number>(
    'units/deleteUnit',
    async (unitId, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.delete(`${UNITS}/${unitId}`);
            return resp.data as UnitsDeleteState;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Delete unit failed');
        }
    }
);
