import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchInvoiceSummary } from "./thunk";
import { InvoiceSummaryListResponse } from "../../../types/invoice/invoiceSummary";
import InvoiceSummaryListStatus from "../../../enums/invoice/invoiceSummary";

interface InvoiceSummaryListState {
    data: InvoiceSummaryListResponse["data"] | null;
    meta: InvoiceSummaryListResponse["meta"] | null;
    status: InvoiceSummaryListStatus;
    error: string | null;
}

const initialState: InvoiceSummaryListState = {
    data: null,
    meta: null,
    status: InvoiceSummaryListStatus.IDLE,
    error: null,
};

const invoiceSummaryListSlice = createSlice({
    name: "invoiceSummary",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchInvoiceSummary.pending, (state) => {
                state.status = InvoiceSummaryListStatus.LOADING;
                state.error = null;
            })
            .addCase(
                fetchInvoiceSummary.fulfilled,
                (state, action: PayloadAction<InvoiceSummaryListResponse>) => {
                    state.status = InvoiceSummaryListStatus.SUCCEEDED;
                    state.data = action.payload.data;
                    state.meta = action.payload.meta;
                }
            )
            .addCase(
                fetchInvoiceSummary.rejected,
                (state, action: PayloadAction<any>) => {
                    state.status = InvoiceSummaryListStatus.FAILED;
                    state.error = action.payload;
                }
            );
    },
});

export default invoiceSummaryListSlice.reducer;
