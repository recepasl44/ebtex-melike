import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { EXAMRELEVANCES } from '../../../helpers/url_helper';

export const deleteExamRelevance = createAsyncThunk<any, number>(
    'examRelevances/deleteExamRelevance',
    async (examRelevanceId, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.delete(`${EXAMRELEVANCES}/${examRelevanceId}`);
            return resp.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Delete exam relevance failed');
        }
    }
);
