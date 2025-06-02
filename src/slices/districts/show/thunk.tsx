import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { DISTRICTS } from '../../../helpers/url_helper';
import { ShowDistrictResponse } from '../../../types/districts/show';

export const showDistrict = createAsyncThunk<
  ShowDistrictResponse,
  number,
  { rejectValue: string }
>(
  'districts/show/showDistrict',
  async (districtId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${DISTRICTS}/${districtId}`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Show district failed');
    }
  }
);
