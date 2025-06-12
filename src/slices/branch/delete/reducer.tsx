import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteBranch } from './thunk';
import { BranchDeleteState } from '../../../types/branch/delete';
import { BranchListStatus } from '../../../enums/branch/list';

const initialState: BranchDeleteState = {
  data: null,
  status: BranchListStatus.IDLE,
  error: null,
};

const branchDeleteSlice = createSlice({
  name: 'branchDelete',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteBranch.pending, (state) => {
        state.status = BranchListStatus.LOADING;
        state.error = null;
      })
      .addCase(deleteBranch.fulfilled, (state, action: PayloadAction<number>) => {
        state.status = BranchListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(deleteBranch.rejected, (state, action: PayloadAction<any>) => {
        state.status = BranchListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default branchDeleteSlice.reducer;
