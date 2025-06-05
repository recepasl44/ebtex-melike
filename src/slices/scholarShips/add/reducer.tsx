import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addScholarship } from "./thunk";
import { ScholarShipAddState, IScholarShipAddPayload } from "../../../types/scholarShips/add";
import { ScholarShipsListStatus } from "../../../enums/scholarShips/list";
import { IScholarShip } from "../../../types/scholarShips/add";

const initialState: ScholarShipAddState = {
    data: null,
    status: ScholarShipsListStatus.IDLE,
    error: null,
    form: {} as IScholarShipAddPayload,
};

const scholarshipAddSlice = createSlice({
    name: "scholarshipAdd",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addScholarship.pending, (state) => {
                state.status = ScholarShipsListStatus.LOADING;
                state.error = null;
            })
            .addCase(addScholarship.fulfilled, (state, action: PayloadAction<IScholarShip>) => {
                state.status = ScholarShipsListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(addScholarship.rejected, (state, action: PayloadAction<any>) => {
                state.status = ScholarShipsListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default scholarshipAddSlice.reducer;
