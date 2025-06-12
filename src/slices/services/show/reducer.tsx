import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ServiceDetailState } from "../../../types/services/show";
import { ServicesListStatus } from "../../../enums/service/list";
import { fetchService } from "./thunk";

const initialState: ServiceDetailState = {
  data: null,
  status: ServicesListStatus.IDLE,
  error: null,
};

const serviceDetailSlice = createSlice({
  name: "serviceDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchService.pending, (state) => {
        state.status = ServicesListStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchService.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = ServicesListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(fetchService.rejected, (state, action: PayloadAction<any>) => {
        state.status = ServicesListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default serviceDetailSlice.reducer;
