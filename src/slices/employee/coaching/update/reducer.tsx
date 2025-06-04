import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateCoaching } from "./thunk";
import { CoachingUpdateResponse } from "../../../../types/employee/coaching/update";
import { CoachingListStatus } from "../../../../enums/employee/coaching/list";

const initialState: CoachingUpdateResponse = {
  data: {} as any,
  status: CoachingListStatus.IDLE,
  error: null,
};

const coachingUpdateSlice = createSlice({
  name: "coachingUpdate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateCoaching.pending, (state) => {
        state.status = CoachingListStatus.LOADING;
        state.error = null;
      })
      .addCase(updateCoaching.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = CoachingListStatus.SUCCESS;
        state.data = action.payload;
      })
      .addCase(updateCoaching.rejected, (state, action: PayloadAction<any>) => {
        state.status = CoachingListStatus.ERROR;
        state.error = action.payload;
      });
  },
});

export default coachingUpdateSlice.reducer;
