import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { DASHBOARD } from '../../../helpers/url_helper';
import { DashboardResponseType } from '../../../components/common/dashboard/type';

export const fetchDashboard = createAsyncThunk<DashboardResponseType>(
  'dashboard/fetchDashboard',
  async (_, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.get(DASHBOARD);
      return resp.data as DashboardResponseType;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Fetch dashboard failed');
    }
  }
);
