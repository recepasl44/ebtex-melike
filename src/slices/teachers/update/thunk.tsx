import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { TEACHERS } from '../../../helpers/url_helper';
import { TeachersUpdatePayload } from '../../../types/teachers/update';
import { TeacherData } from '../../../types/teachers/list';

export const updateTeacher = createAsyncThunk<TeacherData, TeachersUpdatePayload>(
    'teachers/updateTeacher',
    async ({ teacherId, payload }, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.put(`${TEACHERS}/${teacherId}`, payload);
            return resp.data.data as TeacherData;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Update teacher failed');
        }
    }
);
