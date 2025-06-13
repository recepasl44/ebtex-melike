import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { showDistrict } from './thunk';
import { ShowDistrictState, DistrictStatus, IDistrict } from '../../../types/districts/show';

const initialState: ShowDistrictState = {
  data: null,
  status: DistrictStatus.IDLE,
  error: null,
};

const districtShowSlice = createSlice({
  name: 'districts/show',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(showDistrict.pending, (state) => {
      state.status = DistrictStatus.LOADING;
      state.error = null;
    });
    builder.addCase(showDistrict.fulfilled, (state, action) => {
      state.status = DistrictStatus.SUCCEEDED;
      state.data = action.payload as unknown as IDistrict;
    });
    builder.addCase(showDistrict.rejected, (state, action: PayloadAction<any>) => {
      state.status = DistrictStatus.FAILED;
      state.error = action.payload || 'Show district failed';
    });
  },
});

export default districtShowSlice.reducer;
