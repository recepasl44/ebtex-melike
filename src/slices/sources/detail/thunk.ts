import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { SOURCES } from '../update/thunk';
import { SourceData } from '../../../types/sources/list';

export const fetchSource = createAsyncThunk<SourceData, number>(
  'sources/fetchSource',
  async (sourceId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${SOURCES}/${sourceId}`);
      return response.data.data as SourceData;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Fetch source failed');
    }
  }
);
