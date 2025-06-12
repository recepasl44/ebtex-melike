import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { TEACHERS } from '../../../helpers/url_helper';
import { TeachersAddPayload } from '../../../types/teachers/add';
import { TeacherData } from '../../../types/teachers/list';

export const addTeacher = createAsyncThunk<TeacherData, TeachersAddPayload>(
    'teachers/addTeacher',
    async (payload, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.post(TEACHERS, payload);
            return resp.data.data as TeacherData;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Add teacher failed');
        }
    }
);
