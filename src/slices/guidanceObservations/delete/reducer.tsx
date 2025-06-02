import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GuidanceObservationsDeleteState } from "../../../types/guidanceObservations/delete";
import { GuidanceObservationsListStatus } from "../../../enums/guidanceObservations/list";
import { deleteGuidanceObservation } from "./thunk";

const initialState: GuidanceObservationsDeleteState = {
  data: null,
  status: GuidanceObservationsListStatus.IDLE,
  error: null,
};

const guidanceObservationsDeleteSlice = createSlice({
  name: "guidanceObservationsDelete",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteGuidanceObservation.pending, (state) => {
        state.status = GuidanceObservationsListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        deleteGuidanceObservation.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = GuidanceObservationsListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(
        deleteGuidanceObservation.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = GuidanceObservationsListStatus.FAILED;
          state.error = action.payload;
        }
      );
  },
});

export default guidanceObservationsDeleteSlice.reducer;
