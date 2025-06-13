import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { ListFinanceNotesResponse } from '../../../types/financeNotes/list';

interface FetchFinanceNotesArgs {
    page?: number;
    paginate?: number;
    [key: string]: any;
}

export const fetchFinanceNotes = createAsyncThunk<
    ListFinanceNotesResponse,
    FetchFinanceNotesArgs
>('financeNotes/fetch', async (args, { rejectWithValue }) => {
    try {
        const params = new URLSearchParams();
        Object.entries(args).forEach(([key, val]) => {
            if (val !== undefined && val !== null && val !== '') {
                params.append(key, String(val));
            }
        });
        const url = `/finance-notes?${params.toString()}`;
        const response = await axiosInstance.get(url);
        return response.data as ListFinanceNotesResponse;
    } catch (err: any) {
        return rejectWithValue(
            err.response?.data?.message || 'Fetch finance notes failed'
        );
    }
});