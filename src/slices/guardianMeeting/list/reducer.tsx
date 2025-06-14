import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchGuardianMeetings } from "./thunk";
import { GuardianMeetingListStatus } from "../../../enums/guardianMeeting/list";
import {
  GuardianMeetingListResponse,
  GuardianMeetingData,
} from "../../../types/guardianMeeting/list";

interface GuardianMeetingListState {
  data: GuardianMeetingData[] | null;
  links: GuardianMeetingListResponse["links"] | null;
  meta: GuardianMeetingListResponse["meta"] | null;
  status: GuardianMeetingListStatus;
  error: string | null;
}

const initialState: GuardianMeetingListState = {
  data: null,
  links: null,
  meta: null,
  status: GuardianMeetingListStatus.IDLE,
  error: null,
};

const guardianMeetingListSlice = createSlice({
  name: "guardianMeeting/list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGuardianMeetings.pending, (state) => {
        state.status = GuardianMeetingListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchGuardianMeetings.fulfilled,
        (state, action: PayloadAction<GuardianMeetingListResponse>) => {
          state.status = GuardianMeetingListStatus.SUCCEEDED;
          state.data = action.payload.data;
          state.links = action.payload.links;
          state.meta = action.payload.meta;
        }
      )
      .addCase(
        fetchGuardianMeetings.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = GuardianMeetingListStatus.FAILED;
          state.error = action.payload;
        }
      );
  },
});

export default guardianMeetingListSlice.reducer;
