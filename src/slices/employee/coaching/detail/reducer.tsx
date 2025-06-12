import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCoachingDetail } from "./thunk";
import { Coaching } from "../../../../types/employee/coaching/list";
import { CoachingListStatus } from "../../../../enums/employee/coaching/list";

interface CoachingShowState {
  data: Coaching | null;
  status: CoachingListStatus;
  error: string | null;
}

const initialState: CoachingShowState = {
  data: null,
  status: CoachingListStatus.IDLE,
  error: null,
};

const coachingShowSlice = createSlice({
  name: "coaching/show",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoachingDetail.pending, (state) => {
        state.status = CoachingListStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchCoachingDetail.fulfilled, (state, action: PayloadAction<Coaching>) => {
        state.status = CoachingListStatus.SUCCESS;
        state.data = action.payload;
      })
      .addCase(fetchCoachingDetail.rejected, (state, action: PayloadAction<any>) => {
        state.status = CoachingListStatus.ERROR;
        state.error = action.payload;
      });
  },
});

export default coachingShowSlice.reducer;
