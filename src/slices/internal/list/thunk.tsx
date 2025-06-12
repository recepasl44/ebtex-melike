
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { InternalSummaryResponse } from '../../../types/internal/list';

export interface InternalListArgs {
    school_id?: string;
    branche_id?: string;
    [key: string]: any;
    enabled?: boolean;
}

export const fetchInternalSummary = createAsyncThunk<
    InternalSummaryResponse,
    InternalListArgs
>(
    'internal/fetchInternalSummary',
    async (params, { rejectWithValue }) => {
        try {
            const q = new URLSearchParams();
            if (params.school_id) q.append('school_id', params.school_id);
            if (params.branche_id) q.append('branche_id', params.branche_id);

            // → burayı backend'in gerçekte beklediği yola göre ayarlayın
            // eğer endpoint: /students/internals?school_id=…&branche_id=… ise:
            const resp = await axiosInstance.get<InternalSummaryResponse>(
                `/students/internals?${q.toString()}`
            );

            // eğer endpoint: /internals/summary?… ise:
            // const resp = await axiosInstance.get<InternalSummaryResponse>(
            //   `${INTERNALs}/summary?${q.toString()}`
            // );

            return resp.data;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || 'Fetch internal summary failed'
            );
        }
    }
);
