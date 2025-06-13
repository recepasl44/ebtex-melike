import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { QUESTIONTYPES } from '../../../helpers/url_helper';
import { QuestionTypeShowState } from '../../../types/questiontypes/detail';

export const fetchQuestionType = createAsyncThunk<QuestionTypeShowState, number>(
    'questionType/fetchQuestionType',
    async (questionTypeId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${QUESTIONTYPES}/${questionTypeId}`);
            return response.data.data as QuestionTypeShowState;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || 'Fetch question type failed'
            );
        }
    }
);
