import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateGuardianMeeting } from "./thunk";
import { GuardianMeetingUpdateState } from "../../../types/guardianMeeting/update";
import GuardianMeetingListStatus from "../../../enums/guardianMeeting/list";
import { GuardianMeetingData } from "../../../types/guardianMeeting/list";

const initialState: GuardianMeetingUpdateState = {
  data: null,
  status: GuardianMeetingListStatus.IDLE,
  error: null,
};

const guardianMeetingUpdateSlice = createSlice({
  name: "guardianMeetingUpdate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateGuardianMeeting.pending, (state) => {
        state.status = GuardianMeetingListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        updateGuardianMeeting.fulfilled,
        (state, action: PayloadAction<GuardianMeetingData>) => {
          state.status = GuardianMeetingListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(
        updateGuardianMeeting.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = GuardianMeetingListStatus.FAILED;
          state.error = action.payload;
        }
      );
  },
});

export default guardianMeetingUpdateSlice.reducer;
