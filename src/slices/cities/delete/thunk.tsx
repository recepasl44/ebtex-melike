import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { CITIES } from '../../../helpers/url_helper';
import { DeleteCityResponse } from '../../../types/city/delete';

export const deleteCity = createAsyncThunk<
  DeleteCityResponse,
  number,
  { rejectValue: string }
>(
  'city/delete/deleteCity',
  async (cityId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`${CITIES}/${cityId}`);
      return { data: { id: cityId } };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Delete city failed');
    }
  }
);
