import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchBranch } from './thunk';
import { BranchShowState } from '../../../types/branch/show';
import { BranchListStatus } from '../../../enums/branch/list';

const initialState: BranchShowState = {
  data: null,
  status: BranchListStatus.IDLE,
  error: null,
};

const branchShowSlice = createSlice({
  name: 'branchShow',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBranch.pending, (state) => {
        state.status = BranchListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchBranch.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = BranchListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(
        fetchBranch.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = BranchListStatus.FAILED;
          state.error = action.payload;
        }
      );
  },
});

export default branchShowSlice.reducer;
