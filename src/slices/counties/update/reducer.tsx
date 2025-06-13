import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateCounty } from './thunk';
import { UpdateCountyState, UpdateCountyStatus } from '../../../types/counties/update';

const initialState: UpdateCountyState = {
  data: null,
  status: UpdateCountyStatus.IDLE,
  error: null,
};

const countyUpdateSlice = createSlice({
  name: 'counties/update',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateCounty.pending, (state) => {
      state.status = UpdateCountyStatus.LOADING;
      state.error = null;
    });
    builder.addCase(updateCounty.fulfilled, (state, action: PayloadAction<any>) => {
      state.status = UpdateCountyStatus.SUCCEEDED;
      state.data = action.payload.data;
    });
    builder.addCase(updateCounty.rejected, (state, action: PayloadAction<any>) => {
      state.status = UpdateCountyStatus.FAILED;
      state.error = action.payload || 'Update county failed';
    });
  },
});

export default countyUpdateSlice.reducer;
