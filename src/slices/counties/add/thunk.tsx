import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { COUNTIES } from '../../../helpers/url_helper';
import { AddCountyPayload, AddCountyResponse } from '../../../types/counties/add';

export const addCounty = createAsyncThunk<
  AddCountyResponse,
  AddCountyPayload,
  { rejectValue: string }
>(
  'counties/add/addCounty',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(COUNTIES, payload);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Add county failed');
    }
  }
);
