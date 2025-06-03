import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { INVOICE_BASE } from "../../../helpers/url_helper";
import { InvoiceDetail } from "../../../types/invoice/detail";

export const fetchInvoiceDetail = createAsyncThunk<
    InvoiceDetail,
    number
>(
    "invoice/fetchDetail",
    async (id, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.get(
                `${INVOICE_BASE}/detail/${id}`
            );
            return resp.data.data as InvoiceDetail;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Fetch invoice detail failed");
        }
    }
);
