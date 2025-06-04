import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { QUESTIONDIFFICULTS } from '../../../helpers/url_helper';
import { QuestionDifficultUpdatePayload } from '../../../types/questiondifficults/update';
import { data } from '../../../types/questiondifficults/list';

export const updateQuestionDifficult = createAsyncThunk<data, QuestionDifficultUpdatePayload>(
    'questiondifficults/updateQuestionDifficult',
    async ({ questionDifficultId, payload }, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.put(`${QUESTIONDIFFICULTS}/${questionDifficultId}`, payload);
            return resp.data.data as data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Update question difficult failed');
        }
    }
);
