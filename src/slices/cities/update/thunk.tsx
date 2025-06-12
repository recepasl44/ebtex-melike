import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { CITIES } from '../../../helpers/url_helper';
import { UpdateCityPayload, UpdateCityResponse } from '../../../types/city/update';

export const updateCity = createAsyncThunk<
  UpdateCityResponse,
  { cityId: number; payload: UpdateCityPayload },
  { rejectValue: string }
>(
  'city/update/updateCity',
  async ({ cityId, payload }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`${CITIES}/${cityId}`, payload);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Update city failed');
    }
  }
);
