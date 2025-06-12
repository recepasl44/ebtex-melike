import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import GuidanceMeetingsListStatus from "../../../enums/guidanceMeeting/list";
import { GuidanceMeetingsAddState } from "../../../types/guidanceMeeting/add";
import { addGuidanceMeeting } from "./thunk";

const initialState: GuidanceMeetingsAddState = {
  data: null,
  status: GuidanceMeetingsListStatus.IDLE,
  error: null,
};

const guidanceMeetingsAddSlice = createSlice({
  name: "guidanceMeetingsAdd",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addGuidanceMeeting.pending, (state) => {
        state.status = GuidanceMeetingsListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        addGuidanceMeeting.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = GuidanceMeetingsListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(
        addGuidanceMeeting.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = GuidanceMeetingsListStatus.FAILED;
          state.error = action.payload;
        }
      );
  },
});

export default guidanceMeetingsAddSlice.reducer;
