import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { SOURCES } from '../update/thunk';
import { SourcesDeleteState } from '../../../types/sources/delete';

export const deleteSource = createAsyncThunk<SourcesDeleteState, number>(
  'sources/deleteSource',
  async (sourceId, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.delete(`${SOURCES}/${sourceId}`);
      return resp.data as SourcesDeleteState;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Delete source failed');
    }
  }
);
