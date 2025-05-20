import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { QUESTIONDIFFICULTS } from '../../../helpers/url_helper';
import { ListQuestionDifficultResponse, QuestionDifficultListArg } from '../../../types/questiondifficults/list';

export const fetchQuestionDifficults = createAsyncThunk<ListQuestionDifficultResponse, QuestionDifficultListArg>(
    'questionDifficults/fetchQuestionDifficults',
    async (queryParams, { rejectWithValue }) => {
        try {
            const query = new URLSearchParams();
            Object.entries(queryParams).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    query.append(key, String(value));
                }
            });
            const queryString = new URLSearchParams(queryParams).toString();
            const url = `${QUESTIONDIFFICULTS}?${queryString}`;
            const resp = await axiosInstance.get(url);
            return resp.data as ListQuestionDifficultResponse;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Fetch question difficults failed');
        }
    }
);
