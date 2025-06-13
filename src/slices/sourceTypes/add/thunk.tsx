import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { SOURCETYPES } from '../../../helpers/url_helper';
import { SourceTypesAddPayload } from '../../../types/sourceTypes/add';
import { SourceTypeData } from '../../../types/sourceTypes/list';

export const addSourceType = createAsyncThunk<SourceTypeData, SourceTypesAddPayload>(
    'sourceTypes/addSourceType',
    async (payload, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.post(SOURCETYPES, payload);
            return resp.data.data as SourceTypeData;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Add sourceType failed');
        }
    }
);
