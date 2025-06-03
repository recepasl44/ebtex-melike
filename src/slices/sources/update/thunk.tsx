import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { SOURCES } from '../../../helpers/url_helper';
import { SourcesUpdatePayload } from '../../../types/sources/update';
import { SourceData } from '../../../types/sources/list';

export const updateSource = createAsyncThunk<SourceData, SourcesUpdatePayload>(
    'sources/updateSource',
    async ({ sourceId, payload }, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.put(`${SOURCES}/${sourceId}`, payload);
            return resp.data.data as SourceData;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Update source failed');
        }
    }
);
