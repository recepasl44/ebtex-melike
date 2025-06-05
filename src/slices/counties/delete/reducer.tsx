import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteCounty } from './thunk';
import { DeleteCountyState, DeleteCountyStatus } from '../../../types/counties/delete';

const initialState: DeleteCountyState = {
  data: null,
  status: DeleteCountyStatus.IDLE,
  error: null,
};

const countyDeleteSlice = createSlice({
  name: 'counties/delete',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteCounty.pending, (state) => {
      state.status = DeleteCountyStatus.LOADING;
      state.error = null;
    });
    builder.addCase(deleteCounty.fulfilled, (state, action: PayloadAction<{ data: { id: number } }>) => {
      state.status = DeleteCountyStatus.SUCCEEDED;
      state.data = action.payload.data;
    });
    builder.addCase(deleteCounty.rejected, (state, action: PayloadAction<any>) => {
      state.status = DeleteCountyStatus.FAILED;
      state.error = action.payload || 'Delete county failed';
    });
  },
});

export default countyDeleteSlice.reducer;
