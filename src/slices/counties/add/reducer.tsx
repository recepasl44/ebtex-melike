import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addCounty } from './thunk';
import { AddCountyState, AddCountyStatus } from '../../../types/counties/add';

const initialState: AddCountyState = {
  data: null,
  status: AddCountyStatus.IDLE,
  error: null,
};

const countyAddSlice = createSlice({
  name: 'counties/add',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addCounty.pending, (state) => {
      state.status = AddCountyStatus.LOADING;
      state.error = null;
    });
    builder.addCase(addCounty.fulfilled, (state, action: PayloadAction<any>) => {
      state.status = AddCountyStatus.SUCCEEDED;
      state.data = action.payload.data;
    });
    builder.addCase(addCounty.rejected, (state, action: PayloadAction<any>) => {
      state.status = AddCountyStatus.FAILED;
      state.error = action.payload || 'Add county failed';
    });
  },
});

export default countyAddSlice.reducer;
