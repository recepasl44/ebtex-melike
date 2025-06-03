import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { SOURCETYPES } from '../../../helpers/url_helper';
import { SourceTypesListArg, SourceTypesListResponse } from '../../../types/sourceTypes/list';

export const fetchSourceTypes = createAsyncThunk<SourceTypesListResponse, SourceTypesListArg>(
    'sourceTypes/fetchSourceTypes',
    async (queryParams, { rejectWithValue }) => {
        try {
            const query = new URLSearchParams();
            Object.entries(queryParams).forEach(([key, value]) => {
                if (value !== undefined && value !== null && key !== 'enabled') {
                    query.append(key, String(value));
                }
            });
            const queryString = query.toString();
            const url = `${SOURCETYPES}?${queryString}`;
            const resp = await axiosInstance.get(url);
            return resp.data as SourceTypesListResponse;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Fetch sourceTypes failed');
        }
    }
);
