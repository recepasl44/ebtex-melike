import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { TEACHERS } from '../../../helpers/url_helper';
import { TeachersDeleteState } from '../../../types/teachers/delete';

export const deleteTeacher = createAsyncThunk<TeachersDeleteState, number>(
    'teachers/deleteTeacher',
    async (teacherId, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.delete(`${TEACHERS}/${teacherId}`);
            return resp.data as TeachersDeleteState;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Delete teacher failed');
        }
    }
);
