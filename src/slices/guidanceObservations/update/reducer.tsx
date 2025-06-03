import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GuidanceObservationsUpdateState } from "../../../types/guidanceObservations/update";
import { GuidanceObservationsListStatus } from "../../../enums/guidanceObservations/list";
import { updateGuidanceObservation } from "./thunk";

const initialState: GuidanceObservationsUpdateState = {
  data: null,
  status: GuidanceObservationsListStatus.IDLE,
  error: null,
};

const guidanceObservationsUpdateSlice = createSlice({
  name: "guidanceObservationsUpdate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateGuidanceObservation.pending, (state) => {
        state.status = GuidanceObservationsListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        updateGuidanceObservation.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = GuidanceObservationsListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(
        updateGuidanceObservation.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = GuidanceObservationsListStatus.FAILED;
          state.error = action.payload;
        }
      );
  },
});

export default guidanceObservationsUpdateSlice.reducer;
