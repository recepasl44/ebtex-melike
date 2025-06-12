import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { SEASONS } from '../../../helpers/url_helper';
import { SeasonShowState } from '../../../types/seasons/detail';

export const fetchSeason = createAsyncThunk<SeasonShowState, number>(
    'seasons/fetchSeason',
    async (seasonId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${SEASONS}/${seasonId}`);
            return response.data.data as SeasonShowState;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Fetch season failed');
        }
    }
);