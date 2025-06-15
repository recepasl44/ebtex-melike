import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { DASHBOARD } from '../../../helpers/url_helper';
import { DashboardResponseType } from '../../../components/common/dashboard/type';

export const fetchDashboard = createAsyncThunk<DashboardResponseType>(
  'dashboard/fetchDashboard',
  async (_, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.get(DASHBOARD);
      if (!resp.data) {
        throw new Error('No data received from the server');
      }
      return resp.data as DashboardResponseType;
    } catch (err: any) {
      console.error('Dashboard fetch error:', err);
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Fetch dashboard failed'
      );
    }
  }
);
