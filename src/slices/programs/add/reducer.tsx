
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addProgram } from './thunk';
import { ProgramAddState} from '../../../types/programs/add'; 
import { ProgramListStatus } from '../../../enums/programs/list';  

const initialState: ProgramAddState = {
  data: null,
  status: ProgramListStatus.IDLE,
  error: null,
};

const programAddSlice = createSlice({
  name: 'programAdd',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProgram.pending, (state) => {
        state.status = ProgramListStatus.LOADING;
        state.error = null;
      })
      .addCase(addProgram.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = ProgramListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(addProgram.rejected, (state, action: PayloadAction<any>) => {
        state.status = ProgramListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default programAddSlice.reducer;
