import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { showCounty } from './thunk';
import { ShowCountyState, CountyStatus, ICounty, ShowCountyResponse } from '../../../types/counties/show';

const initialState: ShowCountyState = {
  data: null,
  status: CountyStatus.IDLE,
  error: null,
};

const countyShowSlice = createSlice({
  name: 'counties/show',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(showCounty.pending, (state) => {
      state.status = CountyStatus.LOADING;
      state.error = null;
    });
    builder.addCase(showCounty.fulfilled, (state, action: PayloadAction<ShowCountyResponse>) => {
      state.status = CountyStatus.SUCCEEDED;
      state.data = {
        id: action.payload.id,
        name: action.payload.name,
        city_id: action.payload.city_id,
      } as ICounty;
    });
    builder.addCase(showCounty.rejected, (state, action: PayloadAction<any>) => {
      state.status = CountyStatus.FAILED;
      state.error = action.payload || 'Show county failed';
    });
  },
});

export default countyShowSlice.reducer;
