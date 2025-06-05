import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { QUESTIONTYPES } from '../../../helpers/url_helper';
import { QuestionTypeDeleteState } from '../../../types/questiontypes/delete';

export const deleteQuestionType = createAsyncThunk<QuestionTypeDeleteState, number>(
    'questionTypes/deleteQuestionType',
    async (questionTypeId, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.delete(`${QUESTIONTYPES}/${questionTypeId}`);
            return resp.data as QuestionTypeDeleteState;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Delete question type failed');
        }
    }
);
