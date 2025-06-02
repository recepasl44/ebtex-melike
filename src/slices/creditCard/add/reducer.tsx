import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addCreditCard } from "./thunk";
import { CreditCardAddState } from "../../../types/creditCard/add";
import { CreditCardListStatus } from "../../../enums/creditCard/list";

const initialState: CreditCardAddState = {
  data: null,
  status: CreditCardListStatus.IDLE,
  error: null,
};

const creditCardAddSlice = createSlice({
  name: "creditCardAdd",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCreditCard.pending, (state) => {
        state.status = CreditCardListStatus.LOADING;
        state.error = null;
      })
      .addCase(addCreditCard.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = CreditCardListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(addCreditCard.rejected, (state, action: PayloadAction<any>) => {
        state.status = CreditCardListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default creditCardAddSlice.reducer;
