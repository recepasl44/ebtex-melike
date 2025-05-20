import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateCreditCard } from "./thunk";
import { CreditCardUpdateState } from "../../../types/creditCard/update";
import { CreditCardListStatus } from "../../../enums/creditCard/list";

const initialState: CreditCardUpdateState = {
  data: null,
  status: CreditCardListStatus.IDLE,
  error: null,
};

const creditCardUpdateSlice = createSlice({
  name: "creditCardUpdate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateCreditCard.pending, (state) => {
        state.status = CreditCardListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        updateCreditCard.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = CreditCardListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(
        updateCreditCard.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = CreditCardListStatus.FAILED;
          state.error = action.payload;
        }
      );
  },
});

export default creditCardUpdateSlice.reducer;
