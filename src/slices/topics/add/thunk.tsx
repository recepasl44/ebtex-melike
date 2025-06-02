import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { TOPICS } from '../../../helpers/url_helper';
import { TopicsAddPayload } from '../../../types/topics/add';
import { data } from '../../../types/topics/list';

export const addTopic = createAsyncThunk<data, TopicsAddPayload>(
    'topics/addTopic',
    async (payload, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.post(TOPICS, payload);
            return resp.data.data as data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Add topic failed');
        }
    }
);
