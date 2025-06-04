import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DiscountDeleteState } from "../../../types/discounts/delete";
import { DiscountListStatus } from "../../../enums/discounts/list";
import { deleteDiscount } from "./thunk";

const initialState: DiscountDeleteState = {
  data: null,
  status: DiscountListStatus.IDLE,
  error: null,
};

const discountDeleteSlice = createSlice({
  name: "discountDelete",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteDiscount.pending, (state) => {
        state.status = DiscountListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        deleteDiscount.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = DiscountListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(deleteDiscount.rejected, (state, action: PayloadAction<any>) => {
        state.status = DiscountListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default discountDeleteSlice.reducer;
