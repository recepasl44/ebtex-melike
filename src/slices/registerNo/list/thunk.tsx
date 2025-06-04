import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { 
    REGISTER_NO, 

} from '../../../helpers/url_helper';
export const fetchRegisterNo = createAsyncThunk(
    'finalRegister/fetchRegisterNo',
    async (branchId: number, { rejectWithValue }) => {
      try {
        const resp = await axiosInstance.get(`${REGISTER_NO}?branche_id=${branchId}`);
        return resp.data.data; // { register_no: '...' }
      } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || 'Fetch register no failed');
      }
    }
  );