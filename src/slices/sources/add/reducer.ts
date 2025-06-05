import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SourcesAddState } from '../../../types/sources/add';
import SourcesListStatus from '../../../enums/sources/list';
import { addSource } from './thunk';

const initialState: SourcesAddState = {
  data: null,
  status: SourcesListStatus.IDLE,
  error: null,
};

const sourceAddSlice = createSlice({
  name: 'sourceAdd',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addSource.pending, (state) => {
        state.status = SourcesListStatus.LOADING;
        state.error = null;
      })
      .addCase(addSource.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = SourcesListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(addSource.rejected, (state, action: PayloadAction<any>) => {
        state.status = SourcesListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default sourceAddSlice.reducer;
