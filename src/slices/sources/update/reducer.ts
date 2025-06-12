import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SourcesUpdateState } from '../../../types/sources/update';
import SourcesListStatus from '../../../enums/sources/list';
import { updateSource } from './thunk';

const initialState: SourcesUpdateState = {
  data: null,
  status: SourcesListStatus.IDLE,
  error: null,
};

const sourcesUpdateSlice = createSlice({
  name: 'sourcesUpdate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateSource.pending, (state) => {
        state.status = SourcesListStatus.LOADING;
        state.error = null;
      })
      .addCase(updateSource.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = SourcesListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(updateSource.rejected, (state, action: PayloadAction<any>) => {
        state.status = SourcesListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default sourcesUpdateSlice.reducer;
