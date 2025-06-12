import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { InvoiceSummary, InvoiceSummaryListArgs, InvoiceSummaryListResponse } from "../../../types/invoice/invoiceSummary";

export const fetchInvoiceSummary = createAsyncThunk<
    InvoiceSummaryListResponse,
    InvoiceSummaryListArgs
>(
    "invoiceSummary/fetchList",
    async (params, { rejectWithValue }) => {
        try {
            const query = new URLSearchParams();
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null && key !== "enabled") {
                    query.append(key, String(value));
                }
            });
            const resp = await axiosInstance.get<{ data: InvoiceSummary[]; meta: InvoiceSummaryListResponse['meta'] }>(
                `/invoice/summery?${query.toString()}`
            );
            console.log("fsdfsd")
            return { data: resp.data.data, meta: resp.data.meta };
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Fetch invoice summary failed");
        }
    }
);