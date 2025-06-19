import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addPeriod } from "./thunk";
import { PeriodsAddState } from "../../../types/periods/add";
import { PeriodsListStatus } from "../../../enums/periods/list";

const initialState: PeriodsAddState = {
  data: null,
  status: PeriodsListStatus.IDLE,
  error: null,
};

const periodsAddSlice = createSlice({
  name: "periodsAdd",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPeriod.pending, (state) => {
        state.status = PeriodsListStatus.LOADING;
        state.error = null;
      })
      .addCase(addPeriod.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = PeriodsListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(addPeriod.rejected, (state, action: PayloadAction<any>) => {
        state.status = PeriodsListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default periodsAddSlice.reducer;
