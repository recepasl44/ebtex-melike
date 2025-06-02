import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateScholarship } from "./thunk";
import { ScholarShipUpdateState } from "../../../types/scholarShips/update";
import { ScholarShipsListStatus } from "../../../enums/scholarShips/list";
import { IScholarShip } from "../../../types/scholarShips/list";

const initialState: ScholarShipUpdateState = {
    data: null,
    status: ScholarShipsListStatus.IDLE,
    error: null,
};

const scholarshipUpdateSlice = createSlice({
    name: "scholarshipUpdate",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateScholarship.pending, (state) => {
                state.status = ScholarShipsListStatus.LOADING;
                state.error = null;
            })
            .addCase(updateScholarship.fulfilled, (state, action: PayloadAction<IScholarShip>) => {
                state.status = ScholarShipsListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(updateScholarship.rejected, (state, action: PayloadAction<any>) => {
                state.status = ScholarShipsListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default scholarshipUpdateSlice.reducer;