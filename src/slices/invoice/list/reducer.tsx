import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchInvoiceList } from "./thunk";
import { InvoiceListStatus } from "../../../enums/invoice/list";
import { ListInvoiceResponse, Invoice } from "../../../types/invoice/list";

interface InvoiceListState {
    data: Invoice[] | null;
    links: ListInvoiceResponse["links"] | null;
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        path: string;
        per_page: number;
        to: number;
        total: number;
    } | null;
    status: InvoiceListStatus;
    error: string | null;
}

const initialState: InvoiceListState = {
    data: null,
    links: null,
    meta: null,
    status: InvoiceListStatus.IDLE,
    error: null,
};

const invoiceListSlice = createSlice({
    name: "invoiceList",
    initialState,
    reducers: {},
    extraReducers: (b) => {
        b.addCase(fetchInvoiceList.pending, (s) => {
            s.status = InvoiceListStatus.LOADING;
            s.error = null;
        });
        b.addCase(
            fetchInvoiceList.fulfilled,
            (s, a: PayloadAction<ListInvoiceResponse>) => {
                s.status = InvoiceListStatus.SUCCEEDED;
                s.data = a.payload.data;
                s.links = a.payload.links;
                s.meta = {
                    current_page: a.payload.current_page,
                    from: a.payload.from,
                    last_page: a.payload.last_page,
                    path: a.payload.path,
                    per_page: a.payload.per_page,
                    to: a.payload.to,
                    total: a.payload.total,
                };
            }
        );
        b.addCase(fetchInvoiceList.rejected, (s, a: PayloadAction<any>) => {
            s.status = InvoiceListStatus.FAILED;
            s.error = a.payload;
        });
    },
});

export default invoiceListSlice.reducer;
