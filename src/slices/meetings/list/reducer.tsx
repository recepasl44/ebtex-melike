import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchMeetings } from "./thunk";
import { MeetingListResponse } from "../../../types/meetings/list";
import { MeetingListStatus } from "../../../enums/meetings/list";

export interface MeetingListState {
  data: MeetingListResponse["data"] | null;
  links: MeetingListResponse["links"] | null;
  meta: MeetingListResponse["meta"] | null;
  status: MeetingListStatus;
  error: string | null;
}

const initialState: MeetingListState = {
  data: null,
  links: null,
  meta: null,
  status: MeetingListStatus.IDLE,
  error: null,
};

const meetingListSlice = createSlice({
  name: "meetings/list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMeetings.pending, (state) => {
      state.status = MeetingListStatus.LOADING;
      state.error = null;
    });
    builder.addCase(
      fetchMeetings.fulfilled,
      (state, action: PayloadAction<MeetingListResponse>) => {
        state.status = MeetingListStatus.SUCCEEDED;
        state.data = action.payload.data;
        state.links = action.payload.links;
        state.meta = action.payload.meta;
      }
    );
    builder.addCase(
      fetchMeetings.rejected,
      (state, action: PayloadAction<any>) => {
        state.status = MeetingListStatus.FAILED;
        state.error = action.payload || "Fetch meetings failed";
      }
    );
  },
});

export default meetingListSlice.reducer;
