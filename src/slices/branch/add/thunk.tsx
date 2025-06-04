import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { BRANCHES } from '../../../helpers/url_helper';
import { BranchAddPayload } from '../../../types/branch/add';
import { Branch } from '../../../types/branch/list';

export const addBranch = createAsyncThunk<Branch, BranchAddPayload>(
  'branch/addBranch',
  async (payload, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.post(BRANCHES, payload);
      return resp.data.data as Branch;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Add branch failed');
    }
  }
);
