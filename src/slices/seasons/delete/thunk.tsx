import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { SEASONS } from '../../../helpers/url_helper';
import { SeasonsDeleteState } from '../../../types/seasons/delete';

export const deleteSeason = createAsyncThunk<SeasonsDeleteState, number>(
    'seasons/deleteSeason',
    async (seasonId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(`${SEASONS}/${seasonId}`);
            return response.data as SeasonsDeleteState;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Delete season failed');
        }
    }
);