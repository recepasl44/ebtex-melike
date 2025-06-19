import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateMeeting } from "./thunk";
import { MeetingUpdateState } from "../../../types/meetings/update";
import { MeetingListStatus } from "../../../enums/meetings/list";

const initialState: MeetingUpdateState = {
  data: null,
  status: MeetingListStatus.IDLE,
  error: null,
};

const meetingUpdateSlice = createSlice({
  name: "meetingUpdate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateMeeting.pending, (state) => {
        state.status = MeetingListStatus.LOADING;
        state.error = null;
      })
      .addCase(updateMeeting.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = MeetingListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(updateMeeting.rejected, (state, action: PayloadAction<any>) => {
        state.status = MeetingListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default meetingUpdateSlice.reducer;
