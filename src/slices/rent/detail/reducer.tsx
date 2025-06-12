import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchRent } from "./thunk";
import { RentShowState, IRent, RentStatus } from "../../../types/rent/detail";

const initialState: RentShowState = {
  data: null,
  status: RentStatus.IDLE,
  error: null,
};

const rentShowSlice = createSlice({
  name: "rentShow",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRent.pending, (state) => {
        state.status = RentStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchRent.fulfilled, (state, action: PayloadAction<IRent>) => {
        state.status = RentStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(fetchRent.rejected, (state, action: PayloadAction<any>) => {
        state.status = RentStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default rentShowSlice.reducer;
