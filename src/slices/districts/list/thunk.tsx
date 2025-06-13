import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { DISTRICTS } from '../../../helpers/url_helper';
import { ListDistrictResponse, DistrictListArg } from '../../../types/districts/list';

export const fetchdistrict = createAsyncThunk<ListDistrictResponse, DistrictListArg>(
    'distric/fetchlist',
    async (queryParams, { rejectWithValue }) => {
        try {
            const query = new URLSearchParams();
            Object.entries(queryParams).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    query.append(key, String(value));
                }
            });

            const queryString = query.toString();
            const response = await axiosInstance.get(`${DISTRICTS}?${queryString}`);
            return response.data as ListDistrictResponse;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Fetch district failed');
        }
    }
);
