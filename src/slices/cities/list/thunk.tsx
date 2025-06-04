import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { CITIES } from '../../../helpers/url_helper';
import { City, CityLListArg } from '../../../types/city/list';

export const fetchCities = createAsyncThunk<City, CityLListArg>(
  'address/fetchCities',
  async (queryParams, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query.append(key, String(value));
        }
      });

      const queryString = query.toString();
      const response = await axiosInstance.get(`${CITIES}?${queryString}`);

      return response.data as City;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Fetch Cities failed');
    }
  }
);
