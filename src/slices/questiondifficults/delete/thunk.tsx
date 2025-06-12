import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { QUESTIONDIFFICULTS } from '../../../helpers/url_helper';
import { QuestionDifficultDeleteState } from '../../../types/questiondifficults/delete';

export const deleteQuestionDifficult = createAsyncThunk<QuestionDifficultDeleteState, number>(
    'questionDifficults/deleteQuestionDifficult',
    async (questionDifficultId, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.delete(`${QUESTIONDIFFICULTS}/${questionDifficultId}`);
            return resp.data as QuestionDifficultDeleteState;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Delete question difficult failed');
        }
    }
);
