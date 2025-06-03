import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateClassroom } from './thunk';
import { ClassroomUpdateState } from '../../../types/classrooms/update';
import ClassroomListStatus from '../../../enums/classroom/list';

const initialState: ClassroomUpdateState = {
    data: null,
    status: ClassroomListStatus.IDLE,
    error: null,
};

const classroomUpdateSlice = createSlice({
    name: 'classrooms/updateClassroom',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateClassroom.pending, (state) => {
                state.status = ClassroomListStatus.LOADING;
                state.error = null;
            })
            .addCase(updateClassroom.fulfilled, (state, action: PayloadAction<ClassroomUpdateState>) => {
                state.status = ClassroomListStatus.SUCCEEDED;
                state.data = action.payload.data;
            })
            .addCase(updateClassroom.rejected, (state, action: PayloadAction<any>) => {
                state.status = ClassroomListStatus.FAILED;
                state.error = action.payload || 'Update classroom failed';
            });
    },
});

export default classroomUpdateSlice.reducer;