import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addMeeting } from "./thunk";
import { MeetingAddState } from "../../../types/meetings/add";
import { MeetingListStatus } from "../../../enums/meetings/list";

const initialState: MeetingAddState = {
  data: null,
  status: MeetingListStatus.IDLE,
  error: null,
};

const meetingAddSlice = createSlice({
  name: "meetingAdd",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addMeeting.pending, (state) => {
        state.status = MeetingListStatus.LOADING;
        state.error = null;
      })
      .addCase(addMeeting.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = MeetingListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(addMeeting.rejected, (state, action: PayloadAction<any>) => {
        state.status = MeetingListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default meetingAddSlice.reducer;
