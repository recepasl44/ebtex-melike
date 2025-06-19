import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DiscountDetailState } from "../../../types/discounts/show";
import { DiscountListStatus } from "../../../enums/discounts/list";
import { fetchDiscount } from "./thunk";

const initialState: DiscountDetailState = {
  data: null,
  status: DiscountListStatus.IDLE,
  error: null,
};

const discountDetailSlice = createSlice({
  name: "discountDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiscount.pending, (state) => {
        state.status = DiscountListStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchDiscount.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = DiscountListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(fetchDiscount.rejected, (state, action: PayloadAction<any>) => {
        state.status = DiscountListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default discountDetailSlice.reducer;
