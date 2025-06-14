import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ScholarShipListState, ScholarShipsListResponse } from "../../../types/scholarShips/list";
import { ScholarShipsListStatus } from "../../../enums/scholarShips/list";
import { fetchScholarships } from "./thunk";

const initialState: ScholarShipListState = {
    data: null,
    meta: null,
    status: ScholarShipsListStatus.IDLE,
    error: null,
};

const scholarshipListSlice = createSlice({
    name: "scholarshipList",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchScholarships.pending, (state) => {
                state.status = ScholarShipsListStatus.LOADING;
                state.error = null;
            })
            .addCase(
                fetchScholarships.fulfilled,
                (state, action: PayloadAction<ScholarShipsListResponse>) => {
                    state.status = ScholarShipsListStatus.SUCCEEDED;
                    state.data = action.payload.data;
                    state.meta = action.payload.meta;
                }
            )
            .addCase(fetchScholarships.rejected, (state, action: PayloadAction<any>) => {
                state.status = ScholarShipsListStatus.FAILED;
                state.error = action.payload || "Fetch scholarships failed";
            });
    },
});

export default scholarshipListSlice.reducer; 