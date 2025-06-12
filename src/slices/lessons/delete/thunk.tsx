import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { LESSONS } from '../../../helpers/url_helper';

export const deleteLesson = createAsyncThunk<any, number>(
    'lessons/deleteLesson',
    async (lessonId, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.delete(`${LESSONS}/${lessonId}`);
            return resp.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Delete lesson failed');
        }
    }
);
