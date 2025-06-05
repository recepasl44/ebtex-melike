import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchProgramDetail } from "./thunk";
import { ProgramDetailState } from "../../../types/programs/detail";
import { ProgramListStatus } from "../../../enums/programs/list";

const initialState: ProgramDetailState = {
  data: null,
  status: ProgramListStatus.IDLE,
  error: null,
};

const programDetailSlice = createSlice({
  name: "programDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProgramDetail.pending, (state) => {
      state.status = ProgramListStatus.LOADING;
      state.error = null;
    });
    builder.addCase(fetchProgramDetail.fulfilled, (state, action: PayloadAction<any>) => {
      state.status = ProgramListStatus.SUCCEEDED;
      state.data = action.payload;
    });
    builder.addCase(fetchProgramDetail.rejected, (state, action: PayloadAction<any>) => {
      state.status = ProgramListStatus.FAILED;
      state.error = action.payload;
    });
  },
});

export default programDetailSlice.reducer;
