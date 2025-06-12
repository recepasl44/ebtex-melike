import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { QUESTIONDIFFICULTS } from '../../../helpers/url_helper';
import { QuestionDifficultAddPayload } from '../../../types/questiondifficults/add';
import { data } from '../../../types/questiondifficults/list';

export const addQuestionDifficult = createAsyncThunk<data, QuestionDifficultAddPayload>(
    'questionDifficults/addQuestionDifficult',
    async (payload, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.post(QUESTIONDIFFICULTS, payload);
            return resp.data.data as data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Add question difficult failed');
        }
    }
);
