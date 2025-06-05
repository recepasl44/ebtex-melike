import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ServicesListStatus } from "../../../enums/service/list";
import { ServiceListResponse } from "../../../types/services/list";
import { fetchServices } from "./thunk";

export interface ServiceListState {
  data: ServiceListResponse["data"] | null;
  links: ServiceListResponse["links"] | null;
  meta: ServiceListResponse["meta"] | null;
  status: ServicesListStatus;
  error: string | null;
}

const initialState: ServiceListState = {
  data: null,
  links: null,
  meta: null,
  status: ServicesListStatus.IDLE,
  error: null,
};

const serviceListSlice = createSlice({
  name: "services/list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.status = ServicesListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchServices.fulfilled,
        (state, action: PayloadAction<ServiceListResponse>) => {
          state.status = ServicesListStatus.SUCCEEDED;
          state.data = action.payload.data;
          state.links = action.payload.links;
          state.meta = action.payload.meta;
        }
      )
      .addCase(fetchServices.rejected, (state, action: PayloadAction<any>) => {
        state.status = ServicesListStatus.FAILED;
        state.error = action.payload || "Fetch services failed";
      });
  },
});

export default serviceListSlice.reducer;
