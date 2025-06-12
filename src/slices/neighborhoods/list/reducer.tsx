import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchNeighborhoods } from './thunk';
import {
  INeighborhood,
  NeighborhoodListState,
  NeighborhoodListStatus
} from '../../../types/neighborhoods/list';

const initialState: NeighborhoodListState = {
  data: [],
  status: NeighborhoodListStatus.IDLE,
  error: null,
};

const neighborhoodListSlice = createSlice({
  name: 'finalRegister/fetchNeighborhoods',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNeighborhoods.pending, (state) => {
      state.status = NeighborhoodListStatus.LOADING;
      state.error = null;
    });
    builder.addCase(fetchNeighborhoods.fulfilled, (state, action: PayloadAction<INeighborhood[]>) => {
      state.status = NeighborhoodListStatus.SUCCEEDED;
      state.data = action.payload;
    });
    builder.addCase(fetchNeighborhoods.rejected, (state, action: PayloadAction<any>) => {
      state.status = NeighborhoodListStatus.FAILED;
      state.error = action.payload || 'Fetch neighborhoods failed';
    });
  },
});

export default neighborhoodListSlice.reducer;
