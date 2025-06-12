import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { SOURCES } from '../../../helpers/url_helper';
import { SourcesDeleteState } from '../../../types/sources/delete';

export const deleteSource = createAsyncThunk<SourcesDeleteState, number>(
    'sources/deleteSource',
    async (id, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.delete(`${SOURCES}/${id}`);
            return resp.data as SourcesDeleteState;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Delete source failed');
        }
    }
);
