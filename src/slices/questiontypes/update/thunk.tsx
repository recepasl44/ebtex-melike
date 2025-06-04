import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { QUESTIONTYPES } from '../../../helpers/url_helper';
import { QuestionTypeUpdatePayload } from '../../../types/questiontypes/update';
import { data } from '../../../types/questiontypes/list';

export const updateQuestionType = createAsyncThunk<data, QuestionTypeUpdatePayload>(
    'questiontypes/updateQuestionType',
    async ({ questionTypeId, payload }, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.put(`${QUESTIONTYPES}/${questionTypeId}`, payload);
            return resp.data.data as data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Update question type failed');
        }
    }
);
