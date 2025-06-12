import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { APPOINTMENTS } from '../../../helpers/url_helper';
import { data } from '../../../types/appoipments/list';


export const fetchAppointment = createAsyncThunk<data, number>(
    'appointments/fetchAppointment',
    async (appointmentId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${APPOINTMENTS}/${appointmentId}`);
            return response.data.data as data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Fetch appointment failed');
        }
    }
);