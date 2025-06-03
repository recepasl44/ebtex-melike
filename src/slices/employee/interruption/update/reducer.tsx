import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateInterruption } from "./thunk";
import { InterruptionUpdateState } from "../../../../types/employee/interruption/update";
import InterruptionListStatus from "../../../../enums/employee/interruption/list";

const initialState: InterruptionUpdateState = {
  data: null,
  status: InterruptionListStatus.IDLE,
  error: null,
};

const interruptionUpdateSlice = createSlice({
  name: "interruptionUpdate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateInterruption.pending, (state) => {
        state.status = InterruptionListStatus.LOADING;
        state.error = null;
      })
      .addCase(updateInterruption.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = InterruptionListStatus.SUCCESS;
        state.data = action.payload;
      })
      .addCase(updateInterruption.rejected, (state, action: PayloadAction<any>) => {
        state.status = InterruptionListStatus.ERROR;
        state.error = action.payload;
      });
  },
});

export default interruptionUpdateSlice.reducer;
