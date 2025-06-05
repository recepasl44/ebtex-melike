import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    AssignmentStudentsDeleteState,
} from '../../../types/assignmentStudents/delete';
import AssignmentStudentsListStatus
    from '../../../enums/assignmentStudents/list';
import { deleteAssignmentStudent } from './thunk';

const initialState: AssignmentStudentsDeleteState = {
    data: null,
    status: AssignmentStudentsListStatus.IDLE,
    error: null,
};

const assignmentStudentsDeleteSlice = createSlice({
    name: 'assignmentStudentsDelete',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteAssignmentStudent.pending, (state) => {
                state.status = AssignmentStudentsListStatus.LOADING;
                state.error = null;
            })
            .addCase(
                deleteAssignmentStudent.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.status = AssignmentStudentsListStatus.SUCCEEDED;
                    state.data = action.payload;
                }
            )
            .addCase(
                deleteAssignmentStudent.rejected,
                (state, action: PayloadAction<any>) => {
                    state.status = AssignmentStudentsListStatus.FAILED;
                    state.error = action.payload as string;
                }
            );
    },
});

export default assignmentStudentsDeleteSlice.reducer;
