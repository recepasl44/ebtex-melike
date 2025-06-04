import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AssignmentStudentsListStatus from '../../../enums/assignmentStudents/list';
import { AssignmentStudentsDetailState } from '../../../types/assignmentStudents/detail';
import { fetchAssignmentStudent } from './thunk';

const initialState: AssignmentStudentsDetailState = {
    data: null,
    status: AssignmentStudentsListStatus.IDLE,
    error: null,
};

const assignmentStudentsDetailSlice = createSlice({
    name: 'assignmentStudentsDetail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAssignmentStudent.pending, (state) => {
                state.status = AssignmentStudentsListStatus.LOADING;
                state.error = null;
            })
            .addCase(
                fetchAssignmentStudent.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.status = AssignmentStudentsListStatus.SUCCEEDED;
                    state.data = action.payload;
                }
            )
            .addCase(
                fetchAssignmentStudent.rejected,
                (state, action: PayloadAction<any>) => {
                    state.status = AssignmentStudentsListStatus.FAILED;
                    state.error = action.payload as string;
                }
            );
    },
});

export default assignmentStudentsDetailSlice.reducer;
