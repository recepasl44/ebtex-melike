import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { EXAMRELEVANCES } from '../../../helpers/url_helper';
import { ListExamRelevanceResponse, ExamRelevanceListArg } from '../../../types/examrelevances/list';

export const fetchExamRelevances = createAsyncThunk<ListExamRelevanceResponse, ExamRelevanceListArg>(
    'examRelevances/fetchExamRelevances',
    async (queryParams, { rejectWithValue }) => {
        try {
            const query = new URLSearchParams();
            Object.entries(queryParams).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    query.append(key, String(value));
                }
            });
            const queryString = new URLSearchParams(queryParams).toString();
            const url = `${EXAMRELEVANCES}?${queryString}`;
            const resp = await axiosInstance.get(url);
            return resp.data as ListExamRelevanceResponse;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Fetch exam relevances failed');
        }
    }
);
