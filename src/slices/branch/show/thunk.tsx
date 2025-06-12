import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { BRANCHES } from '../../../helpers/url_helper';
import { Branch } from '../../../types/branch/list';

export const fetchBranch = createAsyncThunk<Branch, number>(
  'branch/fetchBranch',
  async (branchId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${BRANCHES}/${branchId}`);
      return response.data.data as Branch;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Fetch branch failed'
      );
    }
  }
);
