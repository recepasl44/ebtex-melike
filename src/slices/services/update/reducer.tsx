import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateService } from "./thunk";
import { ServicesUpdateState } from "../../../types/services/update";
import { ServicesListStatus } from "../../../enums/service/list";

const initialState: ServicesUpdateState = {
  data: null,
  status: ServicesListStatus.IDLE,
  error: null,
};

const serviceUpdateSlice = createSlice({
  name: "serviceUpdate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateService.pending, (state) => {
        state.status = ServicesListStatus.LOADING;
        state.error = null;
      })
      .addCase(updateService.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = ServicesListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(updateService.rejected, (state, action: PayloadAction<any>) => {
        state.status = ServicesListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default serviceUpdateSlice.reducer;
