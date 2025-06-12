import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { DISTRICTS } from '../../../helpers/url_helper';
import { UpdateDistrictPayload, UpdateDistrictResponse } from '../../../types/districts/update';

export const updateDistrict = createAsyncThunk<
  UpdateDistrictResponse,
  { districtId: number; payload: UpdateDistrictPayload },
  { rejectValue: string }
>(
  'districts/update/updateDistrict',
  async ({ districtId, payload }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`${DISTRICTS}/${districtId}`, payload);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Update district failed');
    }
  }
);
