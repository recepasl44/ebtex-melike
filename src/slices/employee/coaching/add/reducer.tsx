import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addCoaching } from "./thunk";
import { CoachingAddResponse } from "../../../../types/employee/coaching/add";
import { CoachingListStatus } from "../../../../enums/employee/coaching/list";

const initialState: CoachingAddResponse = {
  data: {} as any,
  status: CoachingListStatus.IDLE,
  error: null,
};

const coachingAddSlice = createSlice({
  name: "coachingAdd",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCoaching.pending, (state) => {
        state.status = CoachingListStatus.LOADING;
        state.error = null;
      })
      .addCase(addCoaching.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = CoachingListStatus.SUCCESS;
        state.data = action.payload;
      })
      .addCase(addCoaching.rejected, (state, action: PayloadAction<any>) => {
        state.status = CoachingListStatus.ERROR;
        state.error = action.payload;
      });
  },
});

export default coachingAddSlice.reducer;
