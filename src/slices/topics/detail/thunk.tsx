import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { TOPICS } from '../../../helpers/url_helper';
import { TopicShowState } from '../../../types/topics/detail';

export const fetchTopic = createAsyncThunk<TopicShowState, number>(
    'topic/fetchTopic',
    async (topicId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${TOPICS}/${topicId}`);
            return response.data.data as TopicShowState;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || 'Fetch topic failed'
            );
        }
    }
);
