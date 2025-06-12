import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { SOURCETYPES } from '../../../helpers/url_helper';
import { SourceTypesDeleteState } from '../../../types/sourceTypes/delete';

export const deleteSourceType = createAsyncThunk<SourceTypesDeleteState, number>(
    'sourceTypes/deleteSourceType',
    async (id, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.delete(`${SOURCETYPES}/${id}`);
            return resp.data as SourceTypesDeleteState;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Delete sourceType failed');
        }
    }
);
