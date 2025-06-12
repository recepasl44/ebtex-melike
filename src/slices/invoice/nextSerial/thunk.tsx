import { createAsyncThunk } from "@reduxjs/toolkit";
import { NextSerialResponse } from "../../../types/invoice/nextSerial";

export const fetchNextSerial = createAsyncThunk<
    NextSerialResponse,
    void,
    { rejectValue: string }
>(
    "invoice/nextSerial",
    async (_, { rejectWithValue }) => {
        const resp = await fetch(
            "https://anlakogrenme.com/api/v1/invoices/next-serial",
            { method: "GET" }
        );
        if (!resp.ok) {
            return rejectWithValue(`Seri no alınamadı: ${resp.status}`);
        }
        const data = (await resp.json()) as NextSerialResponse;
        return data;
    }
);
