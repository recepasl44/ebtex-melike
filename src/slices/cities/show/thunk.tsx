import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { CITIES } from '../../../helpers/url_helper';
import { ShowCityResponse } from '../../../types/city/show';

export const showCity = createAsyncThunk<
  ShowCityResponse,
  number,
  { rejectValue: string }
>(
  'city/show/showCity',
  async (cityId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${CITIES}/${cityId}`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Show city failed');
    }
  }
);
