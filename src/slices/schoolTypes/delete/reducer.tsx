import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteSchoolType } from "./thunk";
import { SchoolTypeDeleteState } from "../../../types/schoolTypes/delete";
import { SchoolTypeListStatus } from "../../../enums/schoolTypes/list";

const initialState: SchoolTypeDeleteState = {
    data: null,
    status: SchoolTypeListStatus.IDLE,
    error: null
}

const schoolTypeDeleteSlice = createSlice({
    name: "schoolTypesDelete",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(deleteSchoolType.pending, (state) => {

            state.status = SchoolTypeListStatus.LOADING;
        })
            .addCase(deleteSchoolType.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = SchoolTypeListStatus.SUCCEEDED;
                state.data = action.payload.data;
            })
            .addCase(deleteSchoolType.rejected, (state, action: PayloadAction<any>) => {
                state.status = SchoolTypeListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default schoolTypeDeleteSlice.reducer;

