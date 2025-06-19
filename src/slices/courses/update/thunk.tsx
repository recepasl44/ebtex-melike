import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { COURSES } from '../../../helpers/url_helper';
import { CoursesUpdatePayload } from '../../../types/courses/update';
import { data } from '../../../types/courses/list';

export const updateCourse = createAsyncThunk<data, CoursesUpdatePayload>(
  'courses/updateCourse',
    async ({ courseId, payload }, { rejectWithValue }) => {
        try {
        const resp = await axiosInstance.put(`${COURSES}/${courseId}`, payload);
        return resp.data.data as data;
        } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || 'Update course failed');
        }
    }
);