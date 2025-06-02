import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BranchListState, BranchListResponse } from '../../../types/branch/list';
import { BranchListStatus } from '../../../enums/branch/list';
import { fetchBranchList } from './thunk';

const initialState: BranchListState = {
  data: null,
  meta: null,
  status: BranchListStatus.IDLE,
  error: null,
};

const branchListSlice = createSlice({
  name: 'branchList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBranchList.pending, (state) => {
        state.status = BranchListStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchBranchList.fulfilled, (state, action: PayloadAction<BranchListResponse>) => {
        state.status = BranchListStatus.SUCCEEDED;
        state.data = action.payload.data;
        state.meta = action.payload.meta;
     
      })
      .addCase(fetchBranchList.rejected, (state, action: PayloadAction<any>) => {
        state.status = BranchListStatus.FAILED;
        state.error = action.payload || 'Fetch branch list failed';
      });
      
    
  },
});

export default branchListSlice.reducer;
