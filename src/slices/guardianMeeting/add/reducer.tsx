import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GuardianMeetingAddState } from "../../../types/guardianMeeting/add";
import GuardianMeetingListStatus from "../../../enums/guardianMeeting/list";
import { addGuardianMeeting } from "./thunk";
import { GuardianMeetingData } from "../../../types/guardianMeeting/list";

const initialState: GuardianMeetingAddState = {
  data: null,
  status: GuardianMeetingListStatus.IDLE,
  error: null,
};

const guardianMeetingAddSlice = createSlice({
  name: "guardianMeetingAdd",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addGuardianMeeting.pending, (state) => {
        state.status = GuardianMeetingListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        addGuardianMeeting.fulfilled,
        (state, action: PayloadAction<GuardianMeetingData>) => {
          state.status = GuardianMeetingListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(
        addGuardianMeeting.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = GuardianMeetingListStatus.FAILED;
          state.error = action.payload;
        }
      );
  },
});

export default guardianMeetingAddSlice.reducer;
