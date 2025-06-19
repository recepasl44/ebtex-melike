import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addClassroom } from "./thunk";
import { ClassroomAddState } from "../../../types/classrooms/add";
import ClassroomListStatus from "../../../enums/classroom/list";
import { IClassroom } from "../../../types/classrooms/list";

const initialState: ClassroomAddState = {
    data: null,
    status: ClassroomListStatus.IDLE,
    error: null,
};

const classroomAddSlice = createSlice({
    name: "classrooms/addClassroom",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addClassroom.pending, (state) => {
                state.status = ClassroomListStatus.LOADING;
                state.error = null;
            })
            .addCase(addClassroom.fulfilled, (state, action: PayloadAction<IClassroom>) => {
                state.status = ClassroomListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(addClassroom.rejected, (state, action: PayloadAction<any>) => {
                state.status = ClassroomListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default classroomAddSlice.reducer;