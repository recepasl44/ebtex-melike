import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { LESSONS } from '../../../helpers/url_helper';
import { ListLessonsResponse, LessonsListArg } from '../../../types/lessons/list';

export const fetchLessons = createAsyncThunk<ListLessonsResponse, LessonsListArg>(
    'lessons/fetchLessons',
    async (queryParams, { rejectWithValue }) => {
        try {
            const query = new URLSearchParams();
            Object.entries(queryParams).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    query.append(key, String(value));
                }
            });
            const queryString = new URLSearchParams(queryParams).toString();
            const url = `${LESSONS}?${queryString}`;
            const resp = await axiosInstance.get(url);
            return resp.data as ListLessonsResponse;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Fetch lessons failed');
        }
    }
);
