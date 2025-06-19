import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addBranch } from './thunk';
import { BranchAddState } from '../../../types/branch/add';
import { BranchListStatus } from '../../../enums/branch/list';

const initialState: BranchAddState = {
  data: null,
  status: BranchListStatus.IDLE,
  error: null,
};

const branchAddSlice = createSlice({
  name: 'branchAdd',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addBranch.pending, (state) => {
        state.status = BranchListStatus.LOADING;
        state.error = null;
      })
      .addCase(addBranch.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = BranchListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(addBranch.rejected, (state, action: PayloadAction<any>) => {
        state.status = BranchListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default branchAddSlice.reducer;

