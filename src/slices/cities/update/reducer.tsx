import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateCity } from './thunk';
import { UpdateCityState, UpdateCityStatus } from '../../../types/city/update';

const initialState: UpdateCityState = {
  data: null,
  status: UpdateCityStatus.IDLE,
  error: null,
};

const cityUpdateSlice = createSlice({
  name: 'city/update',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateCity.pending, (state) => {
      state.status = UpdateCityStatus.LOADING;
      state.error = null;
    });
    builder.addCase(updateCity.fulfilled, (state, action: PayloadAction<any>) => {
      state.status = UpdateCityStatus.SUCCEEDED;
      state.data = action.payload.data;
    });
    builder.addCase(updateCity.rejected, (state, action: PayloadAction<any>) => {
      state.status = UpdateCityStatus.FAILED;
      state.error = action.payload || 'Update city failed';
    });
  },
});

export default cityUpdateSlice.reducer;
