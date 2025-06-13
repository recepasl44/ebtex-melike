import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DiscountUpdateState } from "../../../types/discounts/update";
import { DiscountListStatus } from "../../../enums/discounts/list";
import { updateDiscount } from "./thunk";

const initialState: DiscountUpdateState = {
  data: null,
  status: DiscountListStatus.IDLE,
  error: null,
};

const discountUpdateSlice = createSlice({
  name: "discountUpdate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateDiscount.pending, (state) => {
        state.status = DiscountListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        updateDiscount.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = DiscountListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(updateDiscount.rejected, (state, action: PayloadAction<any>) => {
        state.status = DiscountListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default discountUpdateSlice.reducer;
