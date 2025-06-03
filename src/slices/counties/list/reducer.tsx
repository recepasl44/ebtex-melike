
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CountyListState } from '../../../types/counties/list';
import { CountyListStatus } from '../../../enums/counties/list';
import { fetchCounties } from './thunk';

const initialState: CountyListState = {
  data: null,
  status: CountyListStatus.IDLE,
  error: null,
};

const countyListSlice = createSlice({
  name: 'countyList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCounties.pending, (state) => {
      state.status = CountyListStatus.LOADING;
      state.error = null;
    });
    builder.addCase(fetchCounties.fulfilled, (state, action: PayloadAction<any>) => {
      state.status = CountyListStatus.SUCCEEDED;
      state.data = action.payload.data;
    });
    builder.addCase(fetchCounties.rejected, (state, action) => {
      state.status = CountyListStatus.FAILED;
      state.error = action.error.message || 'Fetch counties failed';
    });
  },
});

export default countyListSlice.reducer;
