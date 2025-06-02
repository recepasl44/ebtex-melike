import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CityListState} from '../../../types/city/list';
import { CityListStatus } from '../../../enums/city/list';
import { fetchCities } from './thunk';

const initialState: CityListState = {
  data: null,
  status: CityListStatus.IDLE,
  error: null,
};

const cityListSlice = createSlice({
  name: 'cityList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCities.pending, (state) => {
      state.status = CityListStatus.LOADING;
      state.error = null;
    });
    builder.addCase(fetchCities.fulfilled, (state, action: PayloadAction<any>) => {
      state.status = CityListStatus.SUCCEEDED;
      state.data = [action.payload];
    });
    builder.addCase(fetchCities.rejected, (state, action) => {
      state.status = CityListStatus.FAILED;
      state.error = (action.payload as string) || 'Fetch cities failed';
    });
  },
});

export default cityListSlice.reducer;
