
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';  
import { BRANCHES } from '../../../helpers/url_helper'; 
import { BranchListResponse, BranchListArg } from '../../../types/branch/list';  

export const fetchBranchList = createAsyncThunk<BranchListResponse, BranchListArg>(
  'branches/fetchBranches',
  async (queryParams, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query.append(key, String(value));
        }
      });

      const queryString = query.toString();
      const response = await axiosInstance.get(`${BRANCHES}?${queryString}`);
      return response.data as BranchListResponse;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Fetch programs failed');
    }
  }
);

export default fetchBranchList;
