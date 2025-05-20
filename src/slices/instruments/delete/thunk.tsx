import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { INSTRUMENTS } from '../../../helpers/url_helper';

export const deleteInstrument = createAsyncThunk<number, number>(
    'instrument/deleteInstrument',
    async (instrumentId, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`${INSTRUMENTS}/${instrumentId}`);
            return instrumentId;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Delete instrument failed');
        }
    }
);