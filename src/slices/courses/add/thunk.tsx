import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { COURSES } from '../../../helpers/url_helper';
import { CoursesAddPayload } from '../../../types/courses/add';
import { data } from '../../../types/courses/list';

export const addCourse = createAsyncThunk<data, CoursesAddPayload>(
  'course/addCourse',
    async (payload, { rejectWithValue }) => {
        try {
        const resp = await axiosInstance.post(COURSES, payload);
        return resp.data.data as data;
        } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || 'Add course failed');
        }
    });