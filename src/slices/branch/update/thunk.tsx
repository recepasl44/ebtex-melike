import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { BRANCHES } from '../../../helpers/url_helper';
import { BranchUpdatePayload } from '../../../types/branch/update';
import { Branch } from '../../../types/branch/list';

export const updateBranch = createAsyncThunk<Branch, BranchUpdatePayload>(
  'branch/updateBranch',
  async ({ branchId, payload }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(`${BRANCHES}/${branchId}`, payload);
      return resp.data.data as Branch;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Update branch failed');
    }
  }
);
