import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { INVOICE_BASE } from "../../../helpers/url_helper";
import { InvoiceDeletePayload } from "../../../types/invoice/delete";
import { Invoice } from "../../../types/invoice/list";

export const deleteInvoice = createAsyncThunk<
    Invoice,
    InvoiceDeletePayload
>(
    "invoice/deleteInvoice",
    async (id, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.delete(
                `${INVOICE_BASE}/${id}`
            );
            return resp.data.data as Invoice;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Delete invoice failed");
        }
    }
);
