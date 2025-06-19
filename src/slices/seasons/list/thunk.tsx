import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import {
  SEASONS,

} from '../../../helpers/url_helper';
export const fetchSeasons = createAsyncThunk(
  'finalRegister/fetchSeasons',
  async (_, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.get(`${SEASONS}?paginate=9999`);
      return resp.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Fetch seasons failed');
    }
  }
); 