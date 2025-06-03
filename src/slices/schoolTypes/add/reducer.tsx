import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addSchoolType } from "./thunk";
import { SchoolTypeAddState } from "../../../types/schoolTypes/add";
import { SchoolTypeListStatus } from "../../../enums/schoolTypes/list";
import { ISchoolType } from "../../../types/schoolTypes/list";

const initialState: SchoolTypeAddState = {
    data: null,
    name: "",
    status: SchoolTypeListStatus.IDLE,
    error: null,
};

const schoolTypeAddSlice = createSlice({
    name: "schoolTypeAdd",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addSchoolType.pending, (state) => {
                state.status = SchoolTypeListStatus.LOADING;
                state.error = null;
            })
            .addCase(addSchoolType.fulfilled, (state, action: PayloadAction<ISchoolType>) => {
                state.status = SchoolTypeListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(addSchoolType.rejected, (state, action: PayloadAction<any>) => {
                state.status = SchoolTypeListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default schoolTypeAddSlice.reducer;