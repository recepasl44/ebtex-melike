
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateProgram } from './thunk';
import { ProgramUpdateState } from '../../../types/programs/update';  
import { ProgramListStatus } from '../../../enums/programs/list'; 

const initialState: ProgramUpdateState = {
  data: null,
  status: ProgramListStatus.IDLE,
  error: null,
};

const programUpdateSlice = createSlice({
  name: 'programUpdate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateProgram.pending, (state) => {
        state.status = ProgramListStatus.LOADING;
        state.error = null;
      })
      .addCase(updateProgram.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = ProgramListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(updateProgram.rejected, (state, action: PayloadAction<any>) => {
        state.status = ProgramListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default programUpdateSlice.reducer;
