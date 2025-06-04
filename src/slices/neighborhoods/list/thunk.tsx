import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { 
    NEIGHBORHOODS, 

} from '../../../helpers/url_helper';
export const fetchNeighborhoods = createAsyncThunk(
    'finalRegister/fetchNeighborhoods',
    async (districtId: number, { rejectWithValue }) => {
      try {
        const resp = await axiosInstance.get(`${NEIGHBORHOODS}?paginate=999&district_id=${districtId}`);
        return resp.data.data || [];
      } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || 'Fetch neighborhoods failed');
      }
    }
  );