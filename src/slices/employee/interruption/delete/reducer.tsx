import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteInterruption } from "./thunk";
import { InterruptionDeleteStatate } from "../../../../types/employee/interruption/delete";
import InterruptionListStatus from "../../../../enums/employee/interruption/list";

const initialState: InterruptionDeleteStatate = {
  data: null,
  status: InterruptionListStatus.IDLE,
  error: null,
};

const interruptionDeleteSlice = createSlice({
  name: "interruptionDelete",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteInterruption.pending, (state) => {
        state.status = InterruptionListStatus.LOADING;
        state.error = null;
      })
      .addCase(deleteInterruption.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = InterruptionListStatus.SUCCESS;
        state.data = action.payload;
      })
      .addCase(deleteInterruption.rejected, (state, action: PayloadAction<any>) => {
        state.status = InterruptionListStatus.ERROR;
        state.error = action.payload;
      });
  },
});

export default interruptionDeleteSlice.reducer;
