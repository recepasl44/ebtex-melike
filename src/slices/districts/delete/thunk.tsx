import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { DISTRICTS } from '../../../helpers/url_helper';
import { DeleteDistrictResponse } from '../../../types/districts/delete';

export const deleteDistrict = createAsyncThunk<
  DeleteDistrictResponse,
  number,
  { rejectValue: string }
>(
  'districts/delete/deleteDistrict',
  async (districtId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`${DISTRICTS}/${districtId}`);
      return { data: { id: districtId } };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Delete district failed');
    }
  }
);
