import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { SOURCES } from '../../../helpers/url_helper';
import { SourcesAddPayload } from '../../../types/sources/add';
import { SourceData } from '../../../types/sources/list';

export const addSource = createAsyncThunk<SourceData, SourcesAddPayload>(
    'sources/addSource',
    async (payload, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.post(SOURCES, payload);
            return resp.data.data as SourceData;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Add source failed');
        }
    }
);
