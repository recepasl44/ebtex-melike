import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import GuidanceMeetingsListStatus from "../../../enums/guidanceMeeting/list";
import { GuidanceMeetingsDeleteState } from "../../../types/guidanceMeeting/delete";
import { deleteGuidanceMeeting } from "./thunk";

const initialState: GuidanceMeetingsDeleteState = {
  data: null,
  status: GuidanceMeetingsListStatus.IDLE,
  error: null,
};

const guidanceMeetingsDeleteSlice = createSlice({
  name: "guidanceMeetingsDelete",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteGuidanceMeeting.pending, (state) => {
        state.status = GuidanceMeetingsListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        deleteGuidanceMeeting.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = GuidanceMeetingsListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(
        deleteGuidanceMeeting.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = GuidanceMeetingsListStatus.FAILED;
          state.error = action.payload;
        }
      );
  },
});

export default guidanceMeetingsDeleteSlice.reducer;
