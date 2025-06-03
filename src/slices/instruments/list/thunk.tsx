import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { INSTRUMENTS } from '../../../helpers/url_helper';
import { InstrumentListResponse } from '../../../types/instruments/list';
import type { AxiosError } from 'axios';


export interface InstrumentListArgs {
    searchTerm?: string;
    page?: number;
    paginate?: number;
    status?: string;
    branch_id?: number;
    min_price?: number;
    max_price?: number;
}

export const fetchInstrumentList = createAsyncThunk<
    InstrumentListResponse,
    InstrumentListArgs
>(
    'instruments/fetchInstrumentList',
    async (
        { searchTerm = '', page = 1, paginate = 10, status = '', branch_id, min_price, max_price },
        { rejectWithValue }
    ) => {
        try {
            const params = new URLSearchParams();

            if (searchTerm) params.append('search', searchTerm);
            if (page) params.append('page', page.toString());
            if (paginate) params.append('paginate', paginate.toString());
            if (status) params.append('status', status);
            if (branch_id) params.append('branch_id', branch_id.toString());
            if (min_price !== undefined) params.append('min_price', String(min_price));
            if (max_price !== undefined) params.append('max_price', String(max_price));

            const url = `${INSTRUMENTS}?${params.toString()}`;
            const resp = await axiosInstance.get(url);

            return resp.data as InstrumentListResponse;
        } catch (err: AxiosError | any) {
            return rejectWithValue(
                err.response?.data?.message || 'Enstrüman listesi getirilemedi.'
            );
        }
    }
);
