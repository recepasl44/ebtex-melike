import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteDistrict } from './thunk';
import { DeleteDistrictState, DeleteDistrictStatus } from '../../../types/districts/delete';

const initialState: DeleteDistrictState = {
  data: null,
  status: DeleteDistrictStatus.IDLE,
  error: null,
};

const districtDeleteSlice = createSlice({
  name: 'districts/delete',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteDistrict.pending, (state) => {
      state.status = DeleteDistrictStatus.LOADING;
      state.error = null;
    });
    builder.addCase(deleteDistrict.fulfilled, (state, action: PayloadAction<{ data: { id: number } }>) => {
      state.status = DeleteDistrictStatus.SUCCEEDED;
      state.data = action.payload.data;
    });
    builder.addCase(deleteDistrict.rejected, (state, action: PayloadAction<any>) => {
      state.status = DeleteDistrictStatus.FAILED;
      state.error = action.payload || 'Delete district failed';
    });
  },
});

export default districtDeleteSlice.reducer;
