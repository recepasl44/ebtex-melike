import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { SOURCETYPES } from '../../../helpers/url_helper';
import { SourceTypesUpdatePayload } from '../../../types/sourceTypes/update';
import { SourceTypeData } from '../../../types/sourceTypes/list';

export const updateSourceType = createAsyncThunk<SourceTypeData, SourceTypesUpdatePayload>(
    'sourceTypes/updateSourceType',
    async ({ sourceTypeId, payload }, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.put(`${SOURCETYPES}/${sourceTypeId}`, payload);
            return resp.data.data as SourceTypeData;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Update sourceType failed');
        }
    }
);
