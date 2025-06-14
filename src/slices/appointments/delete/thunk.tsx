import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { APPOINTMENTS } from '../../../helpers/url_helper';

export const deleteAppointment = createAsyncThunk<number, number>(
    'appointment/deleteAppointment',
    async (appointmentId, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`${APPOINTMENTS}/${appointmentId}`);
            return appointmentId;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Delete appointment failed');
        }
    }
);
