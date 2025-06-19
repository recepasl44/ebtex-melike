import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addInvoice } from "./thunk";
import { InvoiceAddState } from "../../../types/invoice/add";
import InvoiceListStatus from "../../../enums/invoice/list";

const initialState: InvoiceAddState = {
    data: null,
    status: InvoiceListStatus.IDLE,
    error: null,
};

const invoiceAddSlice = createSlice({
    name: "invoiceAdd",
    initialState,
    reducers: {},
    extraReducers: (b) => {
        b.addCase(addInvoice.pending, (s) => {
            s.status = InvoiceListStatus.LOADING;
            s.error = null;
        });
        b.addCase(addInvoice.fulfilled, (s, a: PayloadAction<any>) => {
            s.status = InvoiceListStatus.SUCCEEDED;
            s.data = a.payload;
        });
        b.addCase(addInvoice.rejected, (s, a: PayloadAction<any>) => {
            s.status = InvoiceListStatus.FAILED;
            s.error = a.payload;
        });
    },
});

export default invoiceAddSlice.reducer;
