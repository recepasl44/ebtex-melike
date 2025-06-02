import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { SOURCES } from '../update/thunk';
import { ListSourcesResponse, SourceListArg } from '../../../types/sources/list';

export const fetchSources = createAsyncThunk<ListSourcesResponse, SourceListArg>(
  'sources/fetchSources',
  async (queryParams, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query.append(key, String(value));
        }
      });
      const queryString = query.toString();
      const url = `${SOURCES}?${queryString}`;
      const resp = await axiosInstance.get(url);
      return resp.data as ListSourcesResponse;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Fetch sources failed');
    }
  }
);
