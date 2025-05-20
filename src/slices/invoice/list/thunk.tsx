import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { INVOICE_BASE } from "../../../helpers/url_helper";
import { ListInvoiceResponse, InvoiceListArgs } from "../../../types/invoice/list";

export const fetchInvoiceList = createAsyncThunk<
    ListInvoiceResponse,
    InvoiceListArgs
>(
    "invoice/fetchList",
    async (params, { rejectWithValue }) => {
        try {
            const query = new URLSearchParams();
            Object.entries(params).forEach(([k, v]) => {
                if (v !== undefined && v !== null) query.append(k, String(v));
            });
            const resp = await axiosInstance.get(
                `${INVOICE_BASE}?${query.toString()}`
            );
            return resp.data as ListInvoiceResponse;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Fetch invoices failed");
        }
    }
);
