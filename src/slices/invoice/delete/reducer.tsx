import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteInvoice } from "./thunk";
import { InvoiceDeleteState } from "../../../types/invoice/delete";
import InvoiceListStatus from "../../../enums/invoice/list";

const initialState: InvoiceDeleteState = {
    data: null,
    status: InvoiceListStatus.IDLE,
    error: null,
};

const invoiceDeleteSlice = createSlice({
    name: "invoiceDelete",
    initialState,
    reducers: {},
    extraReducers: (b) => {
        b.addCase(deleteInvoice.pending, (s) => {
            s.status = InvoiceListStatus.LOADING;
            s.error = null;
        });
        b.addCase(deleteInvoice.fulfilled, (s, a: PayloadAction<any>) => {
            s.status = InvoiceListStatus.SUCCEEDED;
            s.data = a.payload;
        });
        b.addCase(deleteInvoice.rejected, (s, a: PayloadAction<any>) => {
            s.status = InvoiceListStatus.FAILED;
            s.error = a.payload;
        });
    },
});

export default invoiceDeleteSlice.reducer;
