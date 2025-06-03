import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchScholarship } from "./thunk";
import { ScholarShipDetailState } from "../../../types/scholarShips/detail";
import { ScholarShipsListStatus } from "../../../enums/scholarShips/list";
import { IScholarShip } from "../../../types/scholarShips/list";

const initialState: ScholarShipDetailState = {
    data: null,
    status: ScholarShipsListStatus.IDLE,
    error: null,
};

const scholarshipDetailSlice = createSlice({
    name: "scholarshipDetail",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchScholarship.pending, (state) => {
                state.status = ScholarShipsListStatus.LOADING;
                state.error = null;
            })
            .addCase(fetchScholarship.fulfilled, (state, action: PayloadAction<IScholarShip>) => {
                state.status = ScholarShipsListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(fetchScholarship.rejected, (state, action: PayloadAction<any>) => {
                state.status = ScholarShipsListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default scholarshipDetailSlice.reducer;