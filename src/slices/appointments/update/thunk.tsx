import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { AppoipmentPayload } from '../../../types/appoipments/update';
import { AppointmentResponse } from '../../../types/appoipments/list';

export const updateAppointment = createAsyncThunk<AppointmentResponse, AppoipmentPayload>(
    'appointments/updateAppointment',
    async ({ appoipmentId, payload }, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.put(`/api/v1/appointments/${appoipmentId}`, payload);
            return resp.data.data as AppointmentResponse;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Update appointment failed');
        }
    }
);

