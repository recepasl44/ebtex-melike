import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addDistrict } from './thunk';
import { AddDistrictState, AddDistrictStatus } from '../../../types/districts/add';

const initialState: AddDistrictState = {
  data: null,
  status: AddDistrictStatus.IDLE,
  error: null,
};

const districtAddSlice = createSlice({
  name: 'districts/add',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addDistrict.pending, (state) => {
      state.status = AddDistrictStatus.LOADING;
      state.error = null;
    });
    builder.addCase(addDistrict.fulfilled, (state, action: PayloadAction<any>) => {
      state.status = AddDistrictStatus.SUCCEEDED;
      state.data = action.payload.data;
    });
    builder.addCase(addDistrict.rejected, (state, action: PayloadAction<any>) => {
      state.status = AddDistrictStatus.FAILED;
      state.error = action.payload || 'Add district failed';
    });
  },
});

export default districtAddSlice.reducer;
