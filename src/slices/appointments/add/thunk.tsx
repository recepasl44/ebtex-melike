import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { APPOINTMENTS } from '../../../helpers/url_helper';
import { AppoipmentPayload } from '../../../types/appoipments/add';
import { AppointmentResponse } from '../../../types/appoipments/list';

export const addAppointment = createAsyncThunk<AppointmentResponse, AppoipmentPayload>(
    'appointments/addAppointment',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(APPOINTMENTS, payload);
            return response.data.data as AppointmentResponse;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Add appointment failed');
        }
    }
);