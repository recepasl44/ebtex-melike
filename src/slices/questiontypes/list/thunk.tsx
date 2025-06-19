import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { QUESTIONTYPES } from '../../../helpers/url_helper';
import { ListQuestionTypeResponse, QuestionTypeListArg } from '../../../types/questiontypes/list';

export const fetchQuestionTypes = createAsyncThunk<ListQuestionTypeResponse, QuestionTypeListArg>(
    'questionTypes/fetchQuestionTypes',
    async (queryParams, { rejectWithValue }) => {
        try {
            const query = new URLSearchParams();
            Object.entries(queryParams).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    query.append(key, String(value));
                }
            });
            const queryString = new URLSearchParams(queryParams).toString();
            const url = `${QUESTIONTYPES}?${queryString}`;
            const resp = await axiosInstance.get(url);
            return resp.data as ListQuestionTypeResponse;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Fetch question types failed');
        }
    }
);
