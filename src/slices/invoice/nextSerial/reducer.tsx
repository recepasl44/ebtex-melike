import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NextSerialResponse } from "../../../types/invoice/nextSerial";
import { fetchNextSerial } from "./thunk";
import { NextSerialStatus } from "../../../enums/invoice/nextSerial";

interface NextSerialState {
    data: NextSerialResponse | null;
    status: NextSerialStatus;
    error: string | null;
}

const initialState: NextSerialState = {
    data: null,
    status: NextSerialStatus.IDLE,
    error: null,
};

const nextSerialSlice = createSlice({
    name: "nextSerial",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNextSerial.pending, (state) => {
                state.status = NextSerialStatus.LOADING;
                state.error = null;
            })
            .addCase(
                fetchNextSerial.fulfilled,
                (state, action: PayloadAction<NextSerialResponse>) => {
                    state.status = NextSerialStatus.SUCCEEDED;
                    state.data = action.payload;
                }
            )
            .addCase(fetchNextSerial.rejected, (state, action) => {
                state.status = NextSerialStatus.FAILED;
                state.error = action.payload ?? action.error.message ?? null;
            });
    },
});

export default nextSerialSlice.reducer;
