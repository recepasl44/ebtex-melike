import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addInterruption } from "./thunk";
import { InterruptionAddState } from "../../../../types/employee/interruption/add";
import InterruptionListStatus from "../../../../enums/employee/interruption/list";

const initialState: InterruptionAddState = {
  data: null,
  status: InterruptionListStatus.IDLE,
  error: null,
};

const interruptionAddSlice = createSlice({
  name: "interruptionAdd",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addInterruption.pending, (state) => {
        state.status = InterruptionListStatus.LOADING;
        state.error = null;
      })
      .addCase(addInterruption.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = InterruptionListStatus.SUCCESS;
        state.data = action.payload;
      })
      .addCase(addInterruption.rejected, (state, action: PayloadAction<any>) => {
        state.status = InterruptionListStatus.ERROR;
        state.error = action.payload;
      });
  },
});

export default interruptionAddSlice.reducer;
