import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { SOURCETYPES } from '../../../helpers/url_helper';
import { SourceTypeData } from '../../../types/sourceTypes/list';

export const fetchSourceType = createAsyncThunk<SourceTypeData, number>(
    'sourceTypes/fetchSourceType',
    async (id, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.get(`${SOURCETYPES}/${id}`);
            return resp.data.data as SourceTypeData;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Fetch sourceType failed');
        }
    }
);
