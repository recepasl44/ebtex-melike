import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DiscountAddState } from "../../../types/discounts/add";
import { DiscountListStatus } from "../../../enums/discounts/list";
import { addDiscount } from "./thunk";

const initialState: DiscountAddState = {
  data: null,
  status: DiscountListStatus.IDLE,
  error: null,
};

const discountAddSlice = createSlice({
  name: "discountAdd",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addDiscount.pending, (state) => {
        state.status = DiscountListStatus.LOADING;
        state.error = null;
      })
      .addCase(addDiscount.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = DiscountListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(addDiscount.rejected, (state, action: PayloadAction<any>) => {
        state.status = DiscountListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default discountAddSlice.reducer;
