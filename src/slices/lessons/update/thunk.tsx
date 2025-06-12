import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { LESSONS } from '../../../helpers/url_helper';
import { LessonUpdatePayload } from '../../../types/lessons/update';
import { data } from '../../../types/lessons/list';

export const updateLesson = createAsyncThunk<data, LessonUpdatePayload>(
    'lessons/updateLesson',
    async ({ lessonId, payload }, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.put(`${LESSONS}/${lessonId}`, payload);
            return resp.data.data as data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Update lesson failed');
        }
    }
);
