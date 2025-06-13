import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchGuardianMeeting } from "./thunk";
import { GuardianMeetingDetailState } from "../../../types/guardianMeeting/detail";
import GuardianMeetingListStatus from "../../../enums/guardianMeeting/list";
import { GuardianMeetingData } from "../../../types/guardianMeeting/list";

const initialState: GuardianMeetingDetailState = {
  data: null,
  status: GuardianMeetingListStatus.IDLE,
  error: null,
};

const guardianMeetingDetailSlice = createSlice({
  name: "guardianMeetingDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGuardianMeeting.pending, (state) => {
        state.status = GuardianMeetingListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchGuardianMeeting.fulfilled,
        (state, action: PayloadAction<GuardianMeetingData>) => {
          state.status = GuardianMeetingListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(
        fetchGuardianMeeting.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = GuardianMeetingListStatus.FAILED;
          state.error = action.payload;
        }
      );
  },
});

export default guardianMeetingDetailSlice.reducer;
