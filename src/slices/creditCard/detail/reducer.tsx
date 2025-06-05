import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCreditCard } from "./thunk";
import { CreditCardShowState } from "../../../types/creditCard/show";
import { CreditCardListStatus } from "../../../enums/creditCard/list";

const initialState: CreditCardShowState = {
  data: null,
  status: CreditCardListStatus.IDLE,
  error: null,
};

const creditCardShowSlice = createSlice({
  name: "creditCardShow",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreditCard.pending, (state) => {
        state.status = CreditCardListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchCreditCard.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = CreditCardListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(
        fetchCreditCard.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = CreditCardListStatus.FAILED;
          state.error = action.payload;
        }
      );
  },
});
export default creditCardShowSlice.reducer;
