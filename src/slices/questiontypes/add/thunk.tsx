import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { QUESTIONTYPES } from '../../../helpers/url_helper';
import { QuestionTypeAddPayload } from '../../../types/questiontypes/add';
import { data } from '../../../types/questiontypes/list';

export const addQuestionType = createAsyncThunk<data, QuestionTypeAddPayload>(
    'questionTypes/addQuestionType',
    async (payload, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.post(QUESTIONTYPES, payload);
            return resp.data.data as data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Add question type failed');
        }
    }
);
