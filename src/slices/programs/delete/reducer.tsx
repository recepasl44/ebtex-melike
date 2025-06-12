import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteProgram } from "./thunk";
import { ProgramDeleteState } from "../../../types/programs/delete";
import { ProgramListStatus } from "../../../enums/programs/list";

const initialState: ProgramDeleteState = {
  data: null,
  status: ProgramListStatus.IDLE,
  error: null,
};

const programDeleteSlice = createSlice({
  name: "programDelete",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteProgram.pending, (state) => {
      state.status = ProgramListStatus.LOADING;
      state.error = null;
    });
    builder.addCase(deleteProgram.fulfilled, (state, action: PayloadAction<any>) => {
      state.status = ProgramListStatus.SUCCEEDED;
      state.data = action.payload;
    });
    builder.addCase(deleteProgram.rejected, (state, action: PayloadAction<any>) => {
      state.status = ProgramListStatus.FAILED;
      state.error = action.payload;
    });
  },
});

export default programDeleteSlice.reducer;
