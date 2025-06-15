import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DashboardListState } from '../../../types/dashboard/list';
import { DashboardListStatus } from '../../../enums/dashboard/list';
import { DashboardResponseType } from '../../../components/common/dashboard/type';
import { fetchDashboard } from './thunk';

const initialState: DashboardListState = {
  data: null,
  status: DashboardListStatus.IDLE,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.pending, (state) => {
        state.status = DashboardListStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchDashboard.fulfilled, (state, action: PayloadAction<DashboardResponseType>) => {
        state.status = DashboardListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(fetchDashboard.rejected, (state, action: PayloadAction<any>) => {
        state.status = DashboardListStatus.FAILED;
        state.error = action.payload || 'Fetch dashboard failed';
      });
  },
});

export default dashboardSlice.reducer;
