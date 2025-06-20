import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { BULLETINS } from '../../../helpers/url_helper';
import { ListBulletinResponse, BulletinListArg } from '../../../types/bulletins/list';

export const fetchBulletins = createAsyncThunk<ListBulletinResponse, BulletinListArg>(
  'bulletins/fetchBulletins',
  async (queryParams, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query.append(key, String(value));
        }
      });
      const queryString = query.toString();
      const resp = await axiosInstance.get(`${BULLETINS}?${queryString}`);
      return resp.data as ListBulletinResponse;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Fetch bulletins failed');
    }
  }
);
