import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    AssignmentStudentsUpdateState,
} from '../../../types/assignmentStudents/update';
import AssignmentStudentsListStatus from '../../../enums/assignmentStudents/list';
import { updateAssignmentStudent } from './thunk';

const initialState: AssignmentStudentsUpdateState = {
    data: null,
    status: AssignmentStudentsListStatus.IDLE,
    error: null,
};

const assignmentStudentsUpdateSlice = createSlice({
    name: 'assignmentStudents/update',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateAssignmentStudent.pending, (state) => {
                state.status = AssignmentStudentsListStatus.LOADING;
                state.error = null;
            })
            .addCase(
                updateAssignmentStudent.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.status = AssignmentStudentsListStatus.SUCCEEDED;
                    state.data = action.payload;
                }
            )
            .addCase(
                updateAssignmentStudent.rejected,
                (state, action: PayloadAction<any>) => {
                    state.status = AssignmentStudentsListStatus.FAILED;
                    state.error = action.payload as string;
                }
            );
    },
});

export default assignmentStudentsUpdateSlice.reducer;
