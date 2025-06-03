import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { TEACHERS } from '../../../helpers/url_helper';
import { ListTeacherResponse, TeacherListArg } from '../../../types/teachers/list';

export const fetchTeachers = createAsyncThunk<ListTeacherResponse, TeacherListArg>(
    'teachers/fetchTeachers',
    async (queryParams, { rejectWithValue }) => {
        try {
            const query = new URLSearchParams();
            Object.entries(queryParams).forEach(([key, value]) => {
                if (value !== undefined && value !== null && key !== 'enabled') {
                    query.append(key, String(value));
                }
            });
            const queryString = query.toString();
            const url = `${TEACHERS}?${queryString}`;
            const resp = await axiosInstance.get(url);
            return resp.data as ListTeacherResponse;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Fetch teachers failed');
        }
    }
);
