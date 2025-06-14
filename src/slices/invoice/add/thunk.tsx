import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { INVOICE_BASE } from "../../../helpers/url_helper";
import { InvoiceAddPayload } from "../../../types/invoice/add";
import { Invoice } from "../../../types/invoice/list";

export const addInvoice = createAsyncThunk<
    Invoice,
    InvoiceAddPayload
>(
    "invoice/addInvoice",
    async (payload, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.post(
                `${INVOICE_BASE}`,
                payload
            );
            return resp.data.data as Invoice;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Add invoice failed");
        }
    }
);
