import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { TOPICS } from '../../../helpers/url_helper';
import { TopicsUpdatePayload } from '../../../types/topics/update';
import { data } from '../../../types/topics/list';

export const updateTopic = createAsyncThunk<data, TopicsUpdatePayload>(
    'topics/updateTopic',
    async ({ topicId, payload }, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.put(`${TOPICS}/${topicId}`, payload);
            return resp.data.data as data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Update topic failed');
        }
    }
);
