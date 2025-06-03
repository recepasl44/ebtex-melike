import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchSchoolType } from "./thunk";
import { SchooltypeShowState } from "../../../types/schoolTypes/show";
import { SchoolTypeListStatus } from "../../../enums/schoolTypes/list";

const initialState: SchooltypeShowState = {
    data: null,
    status: SchoolTypeListStatus.IDLE,
    error: null,
};

const schoolTypeShowSlice = createSlice({
    name: "schoolTypeShow",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSchoolType.pending, (state) => {
                state.status = SchoolTypeListStatus.LOADING;
                state.error = null;
            })
            .addCase(fetchSchoolType.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = SchoolTypeListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(fetchSchoolType.rejected, (state, action: PayloadAction<any>) => {
                state.status = SchoolTypeListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default schoolTypeShowSlice.reducer;

