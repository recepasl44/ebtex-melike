import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchSeasons } from './thunk';
import { SeasonListStatus } from '../../../enums/seasons/list';
import { SeasonListState } from '../../../types/seasons/list';

const initialState: SeasonListState = {
  data: [],
  status: SeasonListStatus.IDLE,
  meta: null,
  error: null,
};

const seasonListSlice = createSlice({
  name: 'finalRegister/fetchSeasons',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSeasons.pending, (state) => {
      state.status = SeasonListStatus.LOADING;
      state.error = null;
    });
    builder.addCase(fetchSeasons.fulfilled, (state, action: PayloadAction<any>) => {
      state.status = SeasonListStatus.SUCCEEDED;
      state.data = action.payload;
    });
    builder.addCase(fetchSeasons.rejected, (state, action: PayloadAction<any>) => {
      state.status = SeasonListStatus.FAILED;
      state.error = action.payload || 'Fetch seasons failed';
    });
  },
});

export default seasonListSlice.reducer;
