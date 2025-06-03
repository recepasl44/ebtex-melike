import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addCity } from './thunk';
import { AddCityState, AddCityStatus } from '../../../types/city/add';

const initialState: AddCityState = {
  data: null,
  status: AddCityStatus.IDLE,
  error: null,
};

const cityAddSlice = createSlice({
  name: 'city/add',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addCity.pending, (state) => {
      state.status = AddCityStatus.LOADING;
      state.error = null;
    });
    builder.addCase(addCity.fulfilled, (state, action: PayloadAction<any>) => {
      state.status = AddCityStatus.SUCCEEDED;
      state.data = action.payload.data;
    });
    builder.addCase(addCity.rejected, (state, action: PayloadAction<any>) => {
      state.status = AddCityStatus.FAILED;
      state.error = action.payload || 'Add city failed';
    });
  },
});

export default cityAddSlice.reducer;
