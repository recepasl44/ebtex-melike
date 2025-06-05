import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteScholarship } from "./thunk";
import { ScholarShipDeleteState } from "../../../types/scholarShips/delete";
import { ScholarShipsListStatus } from "../../../enums/scholarShips/list";
import { IScholarShip } from "../../../types/scholarShips/list";

const initialState: ScholarShipDeleteState = {
    data: null,
    status: ScholarShipsListStatus.IDLE,
    error: null
}

const scholarshipDeleteSlice = createSlice({
    name: "scholarshipDelete",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(deleteScholarship.pending, (state) => {
            state.status = ScholarShipsListStatus.LOADING;
        })
            .addCase(deleteScholarship.fulfilled, (state, action: PayloadAction<IScholarShip>) => {
                state.status = ScholarShipsListStatus.SUCCEEDED;
                state.data = action.payload.id;
            })
            .addCase(deleteScholarship.rejected, (state, action: PayloadAction<any>) => {
                state.status = ScholarShipsListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default scholarshipDeleteSlice.reducer;