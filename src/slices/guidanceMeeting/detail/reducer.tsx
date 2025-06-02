import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import GuidanceMeetingsListStatus from "../../../enums/guidanceMeeting/list";
import { GuidanceMeetingsDetailState } from "../../../types/guidanceMeeting/detail";
import { fetchGuidanceMeeting } from "./thunk";

const initialState: GuidanceMeetingsDetailState = {
  data: null,
  status: GuidanceMeetingsListStatus.IDLE,
  error: null,
};

const guidanceMeetingsDetailSlice = createSlice({
  name: "guidanceMeetingsDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGuidanceMeeting.pending, (state) => {
        state.status = GuidanceMeetingsListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchGuidanceMeeting.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = GuidanceMeetingsListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(
        fetchGuidanceMeeting.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = GuidanceMeetingsListStatus.FAILED;
          state.error = action.payload;
        }
      );
  },
});

export default guidanceMeetingsDetailSlice.reducer;
