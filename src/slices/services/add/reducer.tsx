import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ServicesAddState } from "../../../types/services/add";
import { ServicesListStatus } from "../../../enums/service/list";
import { addService } from "./thunk";
import { IService } from "../../../types/services/list";

const initialState: ServicesAddState = {
  data: {} as IService,
  status: ServicesListStatus.IDLE,
  error: "",
};

const serviceAddSlice = createSlice({
  name: "serviceAdd",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addService.pending, (state) => {
        state.status = ServicesListStatus.LOADING;
        state.error = "";
      })
      .addCase(addService.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = ServicesListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(addService.rejected, (state, action: PayloadAction<any>) => {
        state.status = ServicesListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default serviceAddSlice.reducer;
