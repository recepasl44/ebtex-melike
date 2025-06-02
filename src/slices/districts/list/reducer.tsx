
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchdistrict } from './thunk';
import { ListDistrictResponse } from '../../../types/districts/list';
import { DistrictsListStatus } from '../../../enums/discrict/list';
interface DiscrictListState {
  data: ListDistrictResponse['data'] | null;
  links: ListDistrictResponse['links'] | null;
  meta: ListDistrictResponse['meta'] | null;
  status: DistrictsListStatus;
  error: string | null;
}
const initialState: DiscrictListState = {
  data: null,
  links: null,
  meta: null,
  status: DistrictsListStatus.IDLE,
  error: null
};
const discrictListSlice = createSlice({
  name: 'discrict/list',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchdistrict.pending, (state) => {
      state.status = DistrictsListStatus.LOADING;
      state.error = null;
    });
    builder.addCase(fetchdistrict.fulfilled, (state, action: PayloadAction<any>) => {
      state.status = DistrictsListStatus.SUCCEEDED;
      state.data = action.payload.data;
      state.links = action.payload.links;
      state.meta = action.payload.meta;
    });
    builder.addCase(fetchdistrict.rejected, (state, action: PayloadAction<any>) => {
      state.status = DistrictsListStatus.FAILED;
      state.error = action.payload;
    });
  }
});
export default discrictListSlice.reducer;
