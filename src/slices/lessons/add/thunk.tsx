import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { LESSONS } from '../../../helpers/url_helper';
import { LessonAddPayload } from '../../../types/lessons/add';
import { data } from '../../../types/lessons/list';

export const addLesson = createAsyncThunk<data, LessonAddPayload>(
    'lessons/addLesson',
    async (payload, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.post(LESSONS, payload);
            return resp.data.data as data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Add lesson failed');
        }
    }
);
