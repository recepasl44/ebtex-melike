import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GuidanceObservationsAddState } from "../../../types/guidanceObservations/add";
import { GuidanceObservationsListStatus } from "../../../enums/guidanceObservations/list";
import { addGuidanceObservation } from "./thunk";

const initialState: GuidanceObservationsAddState = {
  data: null,
  status: GuidanceObservationsListStatus.IDLE,
  error: null,
};

const guidanceObservationsAddSlice = createSlice({
  name: "guidanceObservationsAdd",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addGuidanceObservation.pending, (state) => {
        state.status = GuidanceObservationsListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        addGuidanceObservation.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = GuidanceObservationsListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(
        addGuidanceObservation.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = GuidanceObservationsListStatus.FAILED;
          state.error = action.payload;
        }
      );
  },
});

export default guidanceObservationsAddSlice.reducer;
