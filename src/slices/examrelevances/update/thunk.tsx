import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { EXAMRELEVANCES } from '../../../helpers/url_helper';
import { ExamRelevanceUpdatePayload } from '../../../types/examrelevances/update';
import { data } from '../../../types/examrelevances/list';

export const updateExamRelevance = createAsyncThunk<data, ExamRelevanceUpdatePayload>(
    'examrelevances/updateExamRelevance',
    async ({ examRelevanceId, payload }, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.put(`${EXAMRELEVANCES}/${examRelevanceId}`, payload);
            return resp.data.data as data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Update exam relevance failed');
        }
    }
);
