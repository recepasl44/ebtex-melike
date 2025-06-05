import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCoachingList } from "./thunk";
import {
  CoachingListState,
  CoachingListResponse,
} from "../../../../types/employee/coaching/list";
import { CoachingListStatus } from "../../../../enums/employee/coaching/list";

const initialState: CoachingListState = {
  data: [],
  status: CoachingListStatus.IDLE,
  error: null,
};

const coachingListSlice = createSlice({
  name: "coaching/list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoachingList.pending, (state) => {
        state.status = CoachingListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchCoachingList.fulfilled,
        (state, action: PayloadAction<CoachingListResponse>) => {
          state.status = CoachingListStatus.SUCCESS;
          state.data = action.payload.data;
        }
      )
      .addCase(
        fetchCoachingList.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = CoachingListStatus.ERROR;
          state.error = action.payload || "Fetch coaching list failed";
        }
      );
  },
});

export default coachingListSlice.reducer;
