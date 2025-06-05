import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { UNITS } from '../../../helpers/url_helper';
import { UnitShowState } from '../../../types/units/detail';

export const fetchUnit = createAsyncThunk<UnitShowState, number>(
    'unit/fetchUnit',
    async (unitId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${UNITS}/${unitId}`);
            return response.data.data as UnitShowState;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || 'Fetch unit failed'
            );
        }
    }
);
