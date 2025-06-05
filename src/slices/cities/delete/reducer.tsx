import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteCity } from './thunk';
import { DeleteCityState, DeleteCityStatus } from '../../../types/city/delete';

const initialState: DeleteCityState = {
  data: null,
  status: DeleteCityStatus.IDLE,
  error: null,
};

const cityDeleteSlice = createSlice({
  name: 'city/delete',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteCity.pending, (state) => {
      state.status = DeleteCityStatus.LOADING;
      state.error = null;
    });
    builder.addCase(deleteCity.fulfilled, (state, action: PayloadAction<{ data: { id: number } }>) => {
      state.status = DeleteCityStatus.SUCCEEDED;
      state.data = action.payload.data;
    });
    builder.addCase(deleteCity.rejected, (state, action: PayloadAction<any>) => {
      state.status = DeleteCityStatus.FAILED;
      state.error = action.payload || 'Delete city failed';
    });
  },
});

export default cityDeleteSlice.reducer;
