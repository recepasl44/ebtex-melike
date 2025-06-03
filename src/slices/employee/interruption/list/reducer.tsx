import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchInterruptionList } from "./thunk";
import {
  InterruptionListState,
  InterruptionListResponse,
} from "../../../../types/employee/interruption/list";
import InterruptionListStatus from "../../../../enums/employee/interruption/list";

const initialState: InterruptionListState = {
  data: null,
  status: InterruptionListStatus.IDLE,
  error: null,
};

const interruptionListSlice = createSlice({
  name: "interruption/list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInterruptionList.pending, (state) => {
        state.status = InterruptionListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchInterruptionList.fulfilled,
        (state, action: PayloadAction<InterruptionListResponse>) => {
          state.status = InterruptionListStatus.SUCCESS;
          state.data = action.payload.data;
        }
      )
      .addCase(fetchInterruptionList.rejected, (state, action: PayloadAction<any>) => {
        state.status = InterruptionListStatus.ERROR;
        state.error = action.payload || "Fetch interruption list failed";
      });
  },
});

export default interruptionListSlice.reducer;
