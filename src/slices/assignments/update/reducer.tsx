import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { updateAssignment } from './thunk'
import { AssignmentsUpdateState } from '../../../types/assignments/update'
import { AssignmentsListStatus } from '../../../enums/assignments/list'
import { AssignmentData } from '../../../types/assignments/list'

const initialState: AssignmentsUpdateState = {
    data: null,
    status: AssignmentsListStatus.IDLE,
    error: null,
}

const assignmentsUpdateSlice = createSlice({
    name: 'assignmentsUpdate',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateAssignment.pending, (state) => {
                state.status = AssignmentsListStatus.LOADING
                state.error = null
            })
            .addCase(updateAssignment.fulfilled, (state, action: PayloadAction<AssignmentData>) => {
                state.status = AssignmentsListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(updateAssignment.rejected, (state, action: PayloadAction<any>) => {
                state.status = AssignmentsListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default assignmentsUpdateSlice.reducer
