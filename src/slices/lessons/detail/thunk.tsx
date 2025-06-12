import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { LESSONS } from '../../../helpers/url_helper';
import { LessonShowState } from '../../../types/lessons/detail';

export const fetchLesson = createAsyncThunk<LessonShowState, number>(
    'lesson/fetchLesson',
    async (lessonId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${LESSONS}/${lessonId}`);
            return response.data.data as LessonShowState;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || 'Fetch lesson failed'
            );
        }
    }
);
