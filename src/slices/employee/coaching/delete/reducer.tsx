import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteCoaching } from "./thunk";
import { CoachingDeleteState } from "../../../../types/employee/coaching/delete";
import { CoachingListStatus } from "../../../../enums/employee/coaching/list";

const initialState: CoachingDeleteState = {
  data: null,
  status: CoachingListStatus.IDLE,
  error: null,
};

const coachingDeleteSlice = createSlice({
  name: "coachingDelete",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteCoaching.pending, (state) => {
        state.status = CoachingListStatus.LOADING;
        state.error = null;
      })
      .addCase(deleteCoaching.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = CoachingListStatus.SUCCESS;
        state.data = action.payload;
      })
      .addCase(deleteCoaching.rejected, (state, action: PayloadAction<any>) => {
        state.status = CoachingListStatus.ERROR;
        state.error = action.payload;
      });
  },
});

export default coachingDeleteSlice.reducer;
