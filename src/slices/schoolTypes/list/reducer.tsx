import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SchoolTypeListState, SchoolTypesListResponse } from "../../../types/schoolTypes/list";
import { SchoolTypeListStatus } from "../../../enums/schoolTypes/list";
import { fetchSchoolTypes } from "./thunk";


const initialState: SchoolTypeListState = {
    data: null,
    meta: null,
    status: SchoolTypeListStatus.IDLE,
    error: null,
};

const schoolTypeListSlice = createSlice({
    name: "schoolTypeList",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSchoolTypes.pending, (state) => {
                state.status = SchoolTypeListStatus.LOADING;
                state.error = null;
            })
            .addCase(
                fetchSchoolTypes.fulfilled,
                (state, action: PayloadAction<SchoolTypesListResponse>) => {
                    state.status = SchoolTypeListStatus.SUCCEEDED;
                    state.data = action.payload.data;
                    state.meta = action.payload.meta;
                }
            )
            .addCase(fetchSchoolTypes.rejected, (state, action: PayloadAction<any>) => {
                state.status = SchoolTypeListStatus.FAILED;
                state.error = action.payload || "Fetch school types failed";
            });
    },
});

export default schoolTypeListSlice.reducer;

