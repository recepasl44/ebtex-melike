import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DiscountListResponse } from "../../../types/discounts/list";
import { DiscountListStatus } from "../../../enums/discounts/list";
import { fetchDiscounts } from "./thunk";

interface DiscountListState {
  data: DiscountListResponse["data"] | null;
  links: DiscountListResponse["links"] | null;
  meta: DiscountListResponse["meta"] | null;
  status: string;
  error: string | null;
}

const initialState: DiscountListState = {
  data: null,
  links: null,
  meta: null,
  status: DiscountListStatus.IDLE,
  error: null,
};

const discountListSlice = createSlice({
  name: "discountList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDiscounts.pending, (state) => {
      state.status = DiscountListStatus.LOADING;
      state.error = null;
    });
    builder.addCase(
      fetchDiscounts.fulfilled,
      (state, action: PayloadAction<DiscountListResponse>) => {
        state.status = DiscountListStatus.SUCCEEDED;
        state.data = action.payload.data;
        state.links = action.payload.links;
        state.meta = action.payload.meta;
      }
    );
    builder.addCase(
      fetchDiscounts.rejected,
      (state, action: PayloadAction<any>) => {
        state.status = DiscountListStatus.FAILED;
        state.error = action.payload || "Fetch discounts failed";
      }
    );
  },
});

export default discountListSlice.reducer;
