import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteCreditCard } from "./thunk";
import { ICreditCardDeleteState } from "../../../types/creditCard/delete";
import { CreditCardListStatus } from "../../../enums/creditCard/list";

const initialState: ICreditCardDeleteState = {
  data: null,
  status: CreditCardListStatus.IDLE,
  error: null,
};

const creditCardDeleteSlice = createSlice({
  name: "creditCardDelete",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteCreditCard.pending, (state) => {
        state.status = CreditCardListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        deleteCreditCard.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.status = CreditCardListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(
        deleteCreditCard.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = CreditCardListStatus.FAILED;
          state.error = action.payload;
        }
      );
  },
});

export default creditCardDeleteSlice.reducer;
