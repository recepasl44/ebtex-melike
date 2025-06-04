import axiosInstance from "../../../services/axiosClient";
import { APPOINTMENTS } from "../../../helpers/url_helper";
import { AppointmentArgs,AppointmentResponse } from "../../../types/appoipments/list";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchAppointment = createAsyncThunk<AppointmentResponse, AppointmentArgs, {}>(
    'appoipments/fetchAppoipments',
    async (queryParams, { rejectWithValue }) => {
      try {
        const query = new URLSearchParams();
        Object.entries(queryParams).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            query.append(key, String(value)); 
          }
        });
        const queryString = query.toString();
        const url = `${APPOINTMENTS}?${queryString}`;
        const resp = await axiosInstance.get(url);
        return resp.data as AppointmentResponse;
      
      } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || 'Fetch questions failed');
      }
    }
  );
  