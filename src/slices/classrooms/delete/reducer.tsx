import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteClassroom } from "./thunk";
import { ClassroomDeleteState } from "../../../types/classrooms/delete";
import ClassroomListStatus from "../../../enums/classroom/list";

const initialState: ClassroomDeleteState = {
    data: null,
    status: ClassroomListStatus.IDLE,
    error: null,
};

const classroomDeleteSlice = createSlice({
    name: "classrooms/deleteClassroom",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteClassroom.pending, (state) => {
                state.status = ClassroomListStatus.LOADING;
                state.error = null;
            })
            .addCase(deleteClassroom.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = ClassroomListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(deleteClassroom.rejected, (state, action: PayloadAction<any>) => {
                state.status = ClassroomListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default classroomDeleteSlice.reducer;