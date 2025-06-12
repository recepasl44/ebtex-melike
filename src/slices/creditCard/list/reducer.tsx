import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CreditCardListState,
  CreditCardListResponse,
} from "../../../types/creditCard/list";
import { CreditCardListStatus } from "../../../enums/creditCard/list";
import { fetchCreditCardList } from "./thunk";

const initialState: CreditCardListState = {
  data: null,
  status: CreditCardListStatus.IDLE,
  error: null,
};

const creditCardListSlice = createSlice({
  name: "creditCardList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreditCardList.pending, (state) => {
        state.status = CreditCardListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchCreditCardList.fulfilled,
        (state, action: PayloadAction<CreditCardListResponse>) => {
          state.status = CreditCardListStatus.SUCCEEDED;
          state.data = action.payload.data;
        }
      )
      .addCase(
        fetchCreditCardList.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = CreditCardListStatus.FAILED;
          state.error = action.payload || "Fetch credit cards failed";
        }
      );
  },
});

export default creditCardListSlice.reducer;
