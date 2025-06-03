import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchInvoiceDetail } from "./thunk";
import { InvoiceDetailState } from "../../../types/invoice/detail";
import InvoiceListStatus from "../../../enums/invoice/list";

const initialState: InvoiceDetailState = {
    data: null,
    status: InvoiceListStatus.IDLE,
    error: null,
};

const invoiceDetailSlice = createSlice({
    name: "invoiceDetail",
    initialState,
    reducers: {},
    extraReducers: (b) => {
        b.addCase(fetchInvoiceDetail.pending, (s) => {
            s.status = InvoiceListStatus.LOADING;
            s.error = null;
        });
        b.addCase(
            fetchInvoiceDetail.fulfilled,
            (s, a: PayloadAction<any>) => {
                s.status = InvoiceListStatus.SUCCEEDED;
                s.data = a.payload;
            }
        );
        b.addCase(fetchInvoiceDetail.rejected, (s, a: PayloadAction<any>) => {
            s.status = InvoiceListStatus.FAILED;
            s.error = a.payload;
        });
    },
});

export default invoiceDetailSlice.reducer;
