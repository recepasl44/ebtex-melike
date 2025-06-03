import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPeriods } from "./thunk";
import { PeriodsListResponse } from "../../../types/periods/list";
import { PeriodsListStatus } from "../../../enums/periods/list";

export interface PeriodsListState {
  data: PeriodsListResponse["data"] | null;
  links: PeriodsListResponse["links"] | null;
  meta: PeriodsListResponse["meta"] | null;
  status: PeriodsListStatus;
  error: string | null;
}

const initialState: PeriodsListState = {
  data: null,
  links: null,
  meta: null,
  status: PeriodsListStatus.IDLE,
  error: null,
};

const periodsListSlice = createSlice({
  name: "periods/list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPeriods.pending, (state) => {
        state.status = PeriodsListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchPeriods.fulfilled,
        (state, action: PayloadAction<PeriodsListResponse>) => {
          state.status = PeriodsListStatus.SUCCEEDED;
          state.data = action.payload.data;
          state.links = action.payload.links;
          state.meta = action.payload.meta;
        }
      )
      .addCase(fetchPeriods.rejected, (state, action: PayloadAction<any>) => {
        state.status = PeriodsListStatus.FAILED;
        state.error = action.payload || "Fetch periods failed";
      });
  },
});

export default periodsListSlice.reducer;
