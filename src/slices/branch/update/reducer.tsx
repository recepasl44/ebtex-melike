import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateBranch } from './thunk';
import { BranchUpdateState } from '../../../types/branch/update';
import { BranchListStatus } from '../../../enums/branch/list';

const initialState: BranchUpdateState = {
  data: null,
  status: BranchListStatus.IDLE,
  error: null,
};

const branchUpdateSlice = createSlice({
  name: 'branchUpdate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateBranch.pending, (state) => {
        state.status = BranchListStatus.LOADING;
        state.error = null;
      })
      .addCase(updateBranch.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = BranchListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(updateBranch.rejected, (state, action: PayloadAction<any>) => {
        state.status = BranchListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default branchUpdateSlice.reducer;
