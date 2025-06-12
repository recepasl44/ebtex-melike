import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateSchoolType } from "./thunk";
import { SchoolTypeUpdateState } from "../../../types/schoolTypes/update";
import { SchoolTypeListStatus } from "../../../enums/schoolTypes/list";


const initialState: SchoolTypeUpdateState = {
    data: null,
    status: SchoolTypeListStatus.IDLE,
    error: null,
};

const schoolTypeUpdateSlice = createSlice({
    name: "schoolTypeUpdate",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateSchoolType.pending, (state) => {
                state.status = SchoolTypeListStatus.LOADING;
                state.error = null;
            })
            .addCase(updateSchoolType.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = SchoolTypeListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(updateSchoolType.rejected, (state, action: PayloadAction<any>) => {
                state.status = SchoolTypeListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default schoolTypeUpdateSlice.reducer;
