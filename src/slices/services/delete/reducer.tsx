import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ServicesDeleteState } from "../../../types/services/delete";
import { ServicesListStatus } from "../../../enums/service/list";
import { deleteService } from "./thunk";

const initialState: ServicesDeleteState = {
  data: null,
  status: ServicesListStatus.IDLE,
  error: null,
};

const serviceDeleteSlice = createSlice({
  name: "servicesDelete",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteService.pending, (state) => {
        state.status = ServicesListStatus.LOADING;
        state.error = null;
      })
      .addCase(deleteService.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = ServicesListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(deleteService.rejected, (state, action: PayloadAction<any>) => {
        state.status = ServicesListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default serviceDeleteSlice.reducer;
