import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { COUNTIES } from '../../../helpers/url_helper';
import { DeleteCountyResponse } from '../../../types/counties/delete';

export const deleteCounty = createAsyncThunk<
  DeleteCountyResponse,
  number,
  { rejectValue: string }
>(
  'counties/delete/deleteCounty',
  async (countyId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`${COUNTIES}/${countyId}`);
      return { data: { id: countyId } };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Delete county failed');
    }
  }
);
