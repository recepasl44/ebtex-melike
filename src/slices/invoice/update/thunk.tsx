import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { INVOICE_BASE } from "../../../helpers/url_helper";
import { InvoiceUpdatePayload } from "../../../types/invoice/update";
import { Invoice } from "../../../types/invoice/list";

export const updateInvoice = createAsyncThunk<
    Invoice,
    InvoiceUpdatePayload
>(
    "invoice/updateInvoice",
    async ({ invoiceId, payload }, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.put(
                `${INVOICE_BASE}/${invoiceId}`,
                payload
            );
            return resp.data.data as Invoice;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Update invoice failed");
        }
    }
);
