import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { COUNTIES } from '../../../helpers/url_helper';
import { UpdateCountyPayload, UpdateCountyResponse } from '../../../types/counties/update';

export const updateCounty = createAsyncThunk<
  UpdateCountyResponse,
  { countyId: number; payload: UpdateCountyPayload },
  { rejectValue: string }
>(
  'counties/update/updateCounty',
  async ({ countyId, payload }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`${COUNTIES}/${countyId}`, payload);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Update county failed');
    }
  }
);
