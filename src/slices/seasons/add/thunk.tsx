import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { SEASONS } from '../../../helpers/url_helper';
import { SeasonsAddPayload } from '../../../types/seasons/add';
import { Season } from '../../../types/seasons/list';

export const addSeason = createAsyncThunk<Season, SeasonsAddPayload>(
    'seasons/addSeason',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(SEASONS, payload);
            return response.data.data as Season;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Add season failed');
        }
    }
);