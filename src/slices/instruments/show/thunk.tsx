import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { INSTRUMENTS } from '../../../helpers/url_helper';
import { Instrument } from '../../../types/instruments/list';

export const fetchInstrument = createAsyncThunk<Instrument, number>(
    'instrument/fetchInstrument',
    async (instrumentId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${INSTRUMENTS}/${instrumentId}`);
            return response.data.data as Instrument;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || 'Fetch instrument failed'
            );
        }
    }
);
