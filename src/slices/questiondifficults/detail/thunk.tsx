import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { QUESTIONDIFFICULTS } from '../../../helpers/url_helper';
import { QuestionDifficultShowState } from '../../../types/questiondifficults/detail';

export const fetchQuestionDifficult = createAsyncThunk<QuestionDifficultShowState, number>(
    'questionDifficult/fetchQuestionDifficult',
    async (questionDifficultId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${QUESTIONDIFFICULTS}/${questionDifficultId}`);
            return response.data.data as QuestionDifficultShowState;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || 'Fetch question difficult failed'
            );
        }
    }
);
