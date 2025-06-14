import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { COUNTIES } from '../../../helpers/url_helper';
import { ShowCountyResponse } from '../../../types/counties/show';

export const showCounty = createAsyncThunk<
  ShowCountyResponse,
  number,
  { rejectValue: string }
>(
  'counties/show/showCounty',
  async (countyId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${COUNTIES}/${countyId}`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Show county failed');
    }
  }
);
