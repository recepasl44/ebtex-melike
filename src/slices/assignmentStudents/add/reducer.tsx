// src/slices/assignmentStudents/add/slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AssignmentStudentsAddState } from '../../../types/assignmentStudents/add';
import AssignmentStudentsListStatus from '../../../enums/assignmentStudents/list';
import { addAssignmentStudent } from './thunk';

const initialState: AssignmentStudentsAddState = {
    data: null,
    status: AssignmentStudentsListStatus.IDLE,
    error: null,
};

const assignmentStudentsAddSlice = createSlice({
    name: 'assignmentStudentsAdd',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addAssignmentStudent.pending, (state) => {
                state.status = AssignmentStudentsListStatus.LOADING;
                state.error = null;
            })
            .addCase(
                addAssignmentStudent.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.status = AssignmentStudentsListStatus.SUCCEEDED;
                    state.data = action.payload;
                }
            )
            .addCase(
                addAssignmentStudent.rejected,
                (state, action: PayloadAction<any>) => {
                    state.status = AssignmentStudentsListStatus.FAILED;
                    state.error = action.payload as string;
                }
            );
    },
});

export default assignmentStudentsAddSlice.reducer;
