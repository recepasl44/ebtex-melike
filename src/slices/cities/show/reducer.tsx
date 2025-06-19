import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { showCity } from './thunk';
import { ShowCityState, CityStatus, ShowCityResponse } from '../../../types/city/show';

const initialState: ShowCityState = {
  data: null,
  status: CityStatus.IDLE,
  error: null,
};

const cityShowSlice = createSlice({
  name: 'city/show',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(showCity.pending, (state) => {
      state.status = CityStatus.LOADING;
      state.error = null;
    });
    builder.addCase(showCity.fulfilled, (state, action: PayloadAction<ShowCityResponse>) => {
      state.status = CityStatus.SUCCEEDED;
      state.data = {
        id: action.payload.id,
        name: action.payload.cityName,
        country_id: action.payload.countryId,
      };
    });
    builder.addCase(showCity.rejected, (state, action: PayloadAction<any>) => {
      state.status = CityStatus.FAILED;
      state.error = action.payload || 'Show city failed';
    });
  },
});

export default cityShowSlice.reducer;
