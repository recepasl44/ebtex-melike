import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { DISTRICTS } from '../../../helpers/url_helper';
import { AddDistrictPayload, AddDistrictResponse } from '../../../types/districts/add';

export const addDistrict = createAsyncThunk<
  AddDistrictResponse,
  AddDistrictPayload,
  { rejectValue: string }
>(
  'districts/add/addDistrict',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(DISTRICTS, payload);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Add district failed');
    }
  }
);
