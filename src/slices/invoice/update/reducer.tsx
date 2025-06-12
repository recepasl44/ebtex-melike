import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateInvoice } from "./thunk";
import { InvoiceUpdateState } from "../../../types/invoice/update";
import InvoiceListStatus from "../../../enums/invoice/list";

const initialState: InvoiceUpdateState = {
    data: null,
    status: InvoiceListStatus.IDLE,
    error: null,
};

const invoiceUpdateSlice = createSlice({
    name: "invoiceUpdate",
    initialState,
    reducers: {},
    extraReducers: (b) => {
        b.addCase(updateInvoice.pending, (s) => {
            s.status = InvoiceListStatus.LOADING;
            s.error = null;
        });
        b.addCase(updateInvoice.fulfilled, (s, a: PayloadAction<any>) => {
            s.status = InvoiceListStatus.SUCCEEDED;
            s.data = a.payload;
        });
        b.addCase(updateInvoice.rejected, (s, a: PayloadAction<any>) => {
            s.status = InvoiceListStatus.FAILED;
            s.error = a.payload;
        });
    },
});

export default invoiceUpdateSlice.reducer;
