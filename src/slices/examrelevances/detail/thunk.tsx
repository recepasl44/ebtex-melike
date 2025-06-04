import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { EXAMRELEVANCES } from '../../../helpers/url_helper';
import { ExamRelevanceShowState } from '../../../types/examrelevances/detail';

export const fetchExamRelevance = createAsyncThunk<ExamRelevanceShowState, number>(
    'examRelevance/fetchExamRelevance',
    async (examRelevanceId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${EXAMRELEVANCES}/${examRelevanceId}`);
            return response.data.data as ExamRelevanceShowState;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || 'Fetch exam relevance failed'
            );
        }
    }
);
