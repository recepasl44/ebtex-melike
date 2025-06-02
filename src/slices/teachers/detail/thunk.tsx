import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { TEACHERS } from '../../../helpers/url_helper';
import { TeacherShowState } from '../../../types/teachers/detail';

export const fetchTeacher = createAsyncThunk<TeacherShowState, number>(
    'teacher/fetchTeacher',
    async (teacherId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${TEACHERS}/${teacherId}`);
            return response.data.data as TeacherShowState;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Fetch teacher failed');
        }
    }
);
