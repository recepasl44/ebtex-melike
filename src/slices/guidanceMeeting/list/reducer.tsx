import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ListGuidanceMeetingsResponse } from "../../../types/guidanceMeeting/list";
import GuidanceMeetingsListStatus from "../../../enums/guidanceMeeting/list";
import { fetchGuidanceMeetings } from "./thunk";

export interface GuidanceMeetingsListState {
  data: ListGuidanceMeetingsResponse["data"] | null;
  links: ListGuidanceMeetingsResponse["links"] | null;
  meta: ListGuidanceMeetingsResponse["meta"] | null;
  status: GuidanceMeetingsListStatus;
  error: string | null;
}

const initialState: GuidanceMeetingsListState = {
  data: null,
  links: null,
  meta: null,
  status: GuidanceMeetingsListStatus.IDLE,
  error: null,
};

const guidanceMeetingsListSlice = createSlice({
  name: "guidanceMeetings/list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGuidanceMeetings.pending, (state) => {
        state.status = GuidanceMeetingsListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchGuidanceMeetings.fulfilled,
        (state, action: PayloadAction<ListGuidanceMeetingsResponse>) => {
          state.status = GuidanceMeetingsListStatus.SUCCEEDED;
          state.data = action.payload.data;
          state.links = action.payload.links;
          state.meta = action.payload.meta;
        }
      )
      .addCase(
        fetchGuidanceMeetings.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = GuidanceMeetingsListStatus.FAILED;
          state.error = action.payload || "Fetch guidance meetings failed";
        }
      );
  },
});

export default guidanceMeetingsListSlice.reducer;
