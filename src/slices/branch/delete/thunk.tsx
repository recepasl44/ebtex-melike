import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { BRANCHES } from '../../../helpers/url_helper';

export const deleteBranch = createAsyncThunk<number, number>(
  'branch/deleteBranch',
  async (branchId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`${BRANCHES}/${branchId}`);
      return branchId;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Delete branch failed');
    }
  }
);
