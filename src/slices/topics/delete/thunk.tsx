import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { TOPICS } from '../../../helpers/url_helper';
import { TopicsDeleteState } from '../../../types/topics/delete';

export const deleteTopic = createAsyncThunk<TopicsDeleteState, number>(
    'topics/deleteTopic',
    async (topicId, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.delete(`${TOPICS}/${topicId}`);
            return resp.data as TopicsDeleteState;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Delete topic failed');
        }
    }
);
