import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchInterruptionDetail } from "./thunk";
import { Interruption } from "../../../../types/employee/interruption/list";
import InterruptionListStatus from "../../../../enums/employee/interruption/list";

interface InterruptionShowState {
  data: Interruption | null;
  status: InterruptionListStatus;
  error: string | null;
}

const initialState: InterruptionShowState = {
  data: null,
  status: InterruptionListStatus.IDLE,
  error: null,
};

const interruptionShowSlice = createSlice({
  name: "interruption/show",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInterruptionDetail.pending, (state) => {
        state.status = InterruptionListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchInterruptionDetail.fulfilled,
        (state, action: PayloadAction<Interruption>) => {
          state.status = InterruptionListStatus.SUCCESS;
          state.data = action.payload;
        }
      )
      .addCase(fetchInterruptionDetail.rejected, (state, action: PayloadAction<any>) => {
        state.status = InterruptionListStatus.ERROR;
        state.error = action.payload;
      });
  },
});

export default interruptionShowSlice.reducer;
