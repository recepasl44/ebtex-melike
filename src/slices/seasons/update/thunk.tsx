import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { SeasonsUpdatePayload } from '../../../types/seasons/update';
import { Season } from '../../../types/seasons/list';

export const updateSeason = createAsyncThunk<Season, SeasonsUpdatePayload>(
    'seasons/updateSeason',
    async ({ seasonId, payload }, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.put(`/api/v1/seasons/${seasonId}`, payload);
            return resp.data.data as Season;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Update season failed');
        }
    }
);
