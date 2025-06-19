import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { INSTRUMENTS } from '../../../helpers/url_helper';
import { InstrumentUpdatePayload } from '../../../types/instruments/update';
import { Instrument } from '../../../types/instruments/list';

export const updateInstrument = createAsyncThunk<Instrument, InstrumentUpdatePayload>(
    'instrument/updateInstrument',
    async ({ instrumentId, payload }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(`${INSTRUMENTS}/${instrumentId}`, payload);
            return response.data.data as Instrument;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || 'Update instrument failed'
            );
        }
    }
);