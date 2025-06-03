import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SourcesDetailState } from '../../../types/sources/detail';
import SourcesListStatus from '../../../enums/sources/list';
import { fetchSource } from './thunk';

const initialState: SourcesDetailState = {
  data: null,
  status: SourcesListStatus.IDLE,
  error: null,
};

const sourceDetailSlice = createSlice({
  name: 'sourceDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSource.pending, (state) => {
        state.status = SourcesListStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchSource.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = SourcesListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(fetchSource.rejected, (state, action: PayloadAction<any>) => {
        state.status = SourcesListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default sourceDetailSlice.reducer;
