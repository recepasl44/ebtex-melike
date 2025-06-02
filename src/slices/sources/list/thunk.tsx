import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { SOURCES } from '../../../helpers/url_helper';
import { SourcesListArg, SourcesListResponse } from '../../../types/sources/list';

export const fetchSources = createAsyncThunk<SourcesListResponse, SourcesListArg>(
    'sources/fetchSources',
    async (queryParams, { rejectWithValue }) => {
        try {
            const query = new URLSearchParams();
            Object.entries(queryParams).forEach(([key, value]) => {
                if (value !== undefined && value !== null && key !== 'enabled') {
                    query.append(key, String(value));
                }
            });
            const queryString = query.toString();
            const url = `${SOURCES}?${queryString}`;
            const resp = await axiosInstance.get(url);
            return resp.data as SourcesListResponse;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Fetch sources failed');
        }
    }
);
