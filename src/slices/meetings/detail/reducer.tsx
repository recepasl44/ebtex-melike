import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchMeeting } from "./thunk";
import { MeetingShowState } from "../../../types/meetings/show";
import { MeetingListStatus } from "../../../enums/meetings/list";

const initialState: MeetingShowState = {
  data: null,
  status: MeetingListStatus.IDLE,
  error: null,
};

const meetingShowSlice = createSlice({
  name: "meetingShow",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeeting.pending, (state) => {
        state.status = MeetingListStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchMeeting.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = MeetingListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(fetchMeeting.rejected, (state, action: PayloadAction<any>) => {
        state.status = MeetingListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default meetingShowSlice.reducer;
