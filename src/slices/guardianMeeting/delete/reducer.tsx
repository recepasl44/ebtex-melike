import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GuardianMeetingDeleteState } from "../../../types/guardianMeeting/delete";
import GuardianMeetingListStatus from "../../../enums/guardianMeeting/list";
import { deleteGuardianMeeting } from "./thunk";
import { GuardianMeetingData } from "../../../types/guardianMeeting/list";

const initialState: GuardianMeetingDeleteState = {
  data: null,
  status: GuardianMeetingListStatus.IDLE,
  error: null,
};

const guardianMeetingDeleteSlice = createSlice({
  name: "guardianMeetingDelete",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteGuardianMeeting.pending, (state) => {
        state.status = GuardianMeetingListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        deleteGuardianMeeting.fulfilled,
        (state, action: PayloadAction<GuardianMeetingData>) => {
          state.status = GuardianMeetingListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(
        deleteGuardianMeeting.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = GuardianMeetingListStatus.FAILED;
          state.error = action.payload;
        }
      );
  },
});

export default guardianMeetingDeleteSlice.reducer;
