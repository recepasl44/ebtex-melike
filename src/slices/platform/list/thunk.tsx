import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { 
    PLATFORMS, 

} from '../../../helpers/url_helper';
export const fetchPlatform = createAsyncThunk(
    'finalRegister/fetchPlatform',
    async (params: { branche_id?: number; level_id?: number; course_id?: number; program_id?: number }, { rejectWithValue }) => {
      try {
        const { branche_id, level_id, course_id, program_id } = params;
        const url = `${PLATFORMS}?paginate=20&branche_id=${branche_id || ''}&level_id=${level_id || ''}&course_id=${course_id || ''}&program_id=${program_id || ''}`;
        const resp = await axiosInstance.get(url);
        return resp.data.data;
      } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || 'Fetch platform failed');
      }
    }
  );