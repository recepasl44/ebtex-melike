import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { SOURCES } from '../../../helpers/url_helper';
import { SourceData } from '../../../types/sources/list';

export const fetchSource = createAsyncThunk<SourceData, number>(
    'sources/fetchSource',
    async (id, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.get(`${SOURCES}/${id}`);
            return resp.data.data as SourceData;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Fetch source failed');
        }
    }
);
