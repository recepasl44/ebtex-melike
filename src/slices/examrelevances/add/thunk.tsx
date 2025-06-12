import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { EXAMRELEVANCES } from '../../../helpers/url_helper';
import { ExamRelevanceAddPayload } from '../../../types/examrelevances/add';
import { data } from '../../../types/examrelevances/list';

export const addExamRelevance = createAsyncThunk<data, ExamRelevanceAddPayload>(
    'examRelevances/addExamRelevance',
    async (payload, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.post(EXAMRELEVANCES, payload);
            return resp.data.data as data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Add exam relevance failed');
        }
    }
);
