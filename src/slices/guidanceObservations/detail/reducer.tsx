import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GuidanceObservationsDetailState } from "../../../types/guidanceObservations/detail";
import { GuidanceObservationsListStatus } from "../../../enums/guidanceObservations/list";
import { fetchGuidanceObservation } from "./thunk";

const initialState: GuidanceObservationsDetailState = {
  data: null,
  status: GuidanceObservationsListStatus.IDLE,
  error: null,
};

const guidanceObservationsDetailSlice = createSlice({
  name: "guidanceObservationsDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGuidanceObservation.pending, (state) => {
        state.status = GuidanceObservationsListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchGuidanceObservation.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = GuidanceObservationsListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(
        fetchGuidanceObservation.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = GuidanceObservationsListStatus.FAILED;
          state.error = action.payload;
        }
      );
  },
});

export default guidanceObservationsDetailSlice.reducer;
