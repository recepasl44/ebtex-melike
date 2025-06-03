import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { TOPICS } from '../../../helpers/url_helper';
import { ListTopicResponse, TopicListArg } from '../../../types/topics/list';

export const fetchTopics = createAsyncThunk<ListTopicResponse, TopicListArg>(
    'topics/fetchTopics',
    async (queryParams, { rejectWithValue }) => {
        try {
            const query = new URLSearchParams();
            Object.entries(queryParams).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    query.append(key, String(value));
                }
            });
            const queryString = new URLSearchParams(queryParams).toString();
            const url = `${TOPICS}?${queryString}`;
            const resp = await axiosInstance.get(url);
            return resp.data as ListTopicResponse;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Fetch topics failed');
        }
    }
);
