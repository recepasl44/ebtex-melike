import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GuidanceMeetingsUpdateState } from "../../../types/guidanceMeeting/update";
import GuidanceMeetingsListStatus from "../../../enums/guidanceMeeting/list";
import { updateGuidanceMeeting } from "./thunk";

const initialState: GuidanceMeetingsUpdateState = {
  data: null,
  status: GuidanceMeetingsListStatus.IDLE,
  error: null,
};

const guidanceMeetingUpdateSlice = createSlice({
  name: "guidanceMeetingsUpdate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateGuidanceMeeting.pending, (state) => {
        state.status = GuidanceMeetingsListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        updateGuidanceMeeting.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = GuidanceMeetingsListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(
        updateGuidanceMeeting.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = GuidanceMeetingsListStatus.FAILED;
          state.error = action.payload;
        }
      );
  },
});

export default guidanceMeetingUpdateSlice.reducer;
