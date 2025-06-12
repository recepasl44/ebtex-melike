import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    AssignmentStudentsListResponse,
    AssignmentStudentData,
} from '../../../types/assignmentStudents/list';
import AssignmentStudentsListStatus from '../../../enums/assignmentStudents/list';
import { fetchAssignmentStudents } from './thunk';


interface AssignmentStudentsListState {
    data: AssignmentStudentData[] | null;
    links: AssignmentStudentsListResponse['links'] | null;
    meta: AssignmentStudentsListResponse['meta'] | null;
    status: AssignmentStudentsListStatus;
    error: string | null;
}


const initialState: AssignmentStudentsListState = {
    data: null,
    links: null,
    meta: null,
    status: AssignmentStudentsListStatus.IDLE,
    error: null,
};


const assignmentStudentsListSlice = createSlice({
    name: 'assignmentStudents/list',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAssignmentStudents.pending, (state) => {
                state.status = AssignmentStudentsListStatus.LOADING;
                state.error = null;
            })
            .addCase(
                fetchAssignmentStudents.fulfilled,
                (state, action: PayloadAction<AssignmentStudentsListResponse>) => {
                    state.status = AssignmentStudentsListStatus.SUCCEEDED;
                    state.data = action.payload.data;
                    state.links = action.payload.links;
                    state.meta = action.payload.meta;
                }
            )
            .addCase(
                fetchAssignmentStudents.rejected,
                (state, action: PayloadAction<any>) => {
                    state.status = AssignmentStudentsListStatus.FAILED;
                    state.error = action.payload ?? 'fetchAssignmentStudents failed';
                }
            );
    },
});

export default assignmentStudentsListSlice.reducer;
