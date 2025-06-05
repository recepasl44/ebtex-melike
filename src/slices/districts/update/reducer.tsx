import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateDistrict } from './thunk';
import { UpdateDistrictState, UpdateDistrictStatus } from '../../../types/districts/update';

const initialState: UpdateDistrictState = {
  data: null,
  status: UpdateDistrictStatus.IDLE,
  error: null,
};

const districtUpdateSlice = createSlice({
  name: 'districts/update',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateDistrict.pending, (state) => {
      state.status = UpdateDistrictStatus.LOADING;
      state.error = null;
    });
    builder.addCase(updateDistrict.fulfilled, (state, action: PayloadAction<any>) => {
      state.status = UpdateDistrictStatus.SUCCEEDED;
      state.data = action.payload.data;
    });
    builder.addCase(updateDistrict.rejected, (state, action: PayloadAction<any>) => {
      state.status = UpdateDistrictStatus.FAILED;
      state.error = action.payload || 'Update district failed';
    });
  },
});

export default districtUpdateSlice.reducer;
