import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GuidanceObservationsListResponse } from "../../../types/guidanceObservations/list";
import { GuidanceObservationsListStatus } from "../../../enums/guidanceObservations/list";
import { fetchGuidanceObservations } from "./thunk";

export interface GuidanceObservationsListState {
  data: GuidanceObservationsListResponse["data"] | null;
  links: GuidanceObservationsListResponse["links"] | null;
  meta: GuidanceObservationsListResponse["meta"] | null;
  status: GuidanceObservationsListStatus;
  error: string | null;
}

const initialState: GuidanceObservationsListState = {
  data: null,
  links: null,
  meta: null,
  status: GuidanceObservationsListStatus.IDLE,
  error: null,
};

const guidanceObservationsListSlice = createSlice({
  name: "guidanceObservationsList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGuidanceObservations.pending, (state) => {
        state.status = GuidanceObservationsListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchGuidanceObservations.fulfilled,
        (state, action: PayloadAction<GuidanceObservationsListResponse>) => {
          state.status = GuidanceObservationsListStatus.SUCCEEDED;
          state.data = action.payload.data;
          state.links = action.payload.links;
          state.meta = action.payload.meta;
        }
      )
      .addCase(
        fetchGuidanceObservations.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = GuidanceObservationsListStatus.FAILED;
          state.error = action.payload || "Fetch guidance observations failed";
        }
      );
  },
});

export default guidanceObservationsListSlice.reducer;
