import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { CITIES } from '../../../helpers/url_helper';
import { AddCityPayload, AddCityResponse } from '../../../types/city/add';

export const addCity = createAsyncThunk<
  AddCityResponse,
  AddCityPayload,
  { rejectValue: string }
>(
  'city/add/addCity',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(CITIES, payload);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Add city failed');
    }
  }
);
