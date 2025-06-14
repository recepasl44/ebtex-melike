import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { ATTENDANCES } from '../../../helpers/url_helper';   // '/attendances'
import {
    ListAttendancesResponse,
    AttendancesListArg,
} from '../../../types/attendance/list';

/**
 * GET /attendances
 * Örnek çağrı: /attendances?page=1&paginate=25&orderBy=created_at&sortBy=ASC
 */
export const fetchAttendances = createAsyncThunk<
    ListAttendancesResponse,
    AttendancesListArg
>(
    'attendance/fetchAttendances',
    async (queryParams, { rejectWithValue }) => {
        try {
            /* pageSize ➜ paginate dönüşümü */
            const { pageSize, enabled, ...rest } = queryParams;
            const qs = new URLSearchParams();

            if (pageSize !== undefined && pageSize !== null) {
                qs.append('paginate', String(pageSize));
            }

            /* geri kalan parametreleri ekle (enabled hariç) */
            Object.entries(rest).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    qs.append(key, String(value));
                }
            });

            const url = `${ATTENDANCES}?${qs.toString()}`; // ATTENDANCES = '/attendances'
            const resp = await axiosInstance.get(url);

            return resp.data as ListAttendancesResponse;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || 'Fetch attendances failed',
            );
        }
    },
);
