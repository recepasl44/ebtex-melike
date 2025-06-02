import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { INVOICE_BASE, INVOICE_STUDENT_URL } from "../../../helpers/url_helper";
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
            if (v !== undefined && v !== null && k !== 'student_id') {
                    query.append(k, String(v));
                }            });
     
            let url = `${INVOICE_BASE}?${query.toString()}`;

            if (params.student_id) {
                url = `${INVOICE_STUDENT_URL}/${params.student_id}?${query.toString()}`;
            }

            const resp = await axiosInstance.get(url);
            return resp.data as ListInvoiceResponse;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Fetch invoices failed");
        }
    }
);
