import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteMeeting } from "./thunk";
import { MeetingDeleteState } from "../../../types/meetings/delete";
import { MeetingListStatus } from "../../../enums/meetings/list";

const initialState: MeetingDeleteState = {
  data: null,
  status: MeetingListStatus.IDLE,
  error: null,
};

const meetingDeleteSlice = createSlice({
  name: "meetingDelete",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteMeeting.pending, (state) => {
        state.status = MeetingListStatus.LOADING;
        state.error = null;
      })
      .addCase(deleteMeeting.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = MeetingListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(deleteMeeting.rejected, (state, action: PayloadAction<any>) => {
        state.status = MeetingListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default meetingDeleteSlice.reducer;
