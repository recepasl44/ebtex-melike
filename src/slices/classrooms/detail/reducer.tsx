import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchClassroom } from "./thunk";
import { ClassroomDetailState } from "../../../types/classrooms/detail";
import ClassroomListStatus from "../../../enums/classroom/list";

const initialState: ClassroomDetailState = {
    data: null,
    status: ClassroomListStatus.IDLE,
    error: null,
    quota: 0,
    id: 0,
    name: ""
};

const classroomDetailSlice = createSlice({
    name: "classrooms/fetchClassroom",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchClassroom.pending, (state) => {
                state.status = ClassroomListStatus.LOADING;
                state.error = null;
            })
            .addCase(fetchClassroom.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = ClassroomListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(fetchClassroom.rejected, (state, action: PayloadAction<any>) => {
                state.status = ClassroomListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default classroomDetailSlice.reducer;