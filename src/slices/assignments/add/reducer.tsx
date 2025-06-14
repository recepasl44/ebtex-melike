import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addAssignment } from './thunk'
import { AssignmentsAddState } from '../../../types/assignments/add'
import { AssignmentsListStatus } from '../../../enums/assignments/list'
import { AssignmentData } from '../../../types/assignments/list'

const initialState: AssignmentsAddState = {
    data: null,
    status: AssignmentsListStatus.IDLE,
    error: null,
}

const assignmentsAddSlice = createSlice({
    name: 'assignmentsAdd',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addAssignment.pending, (state) => {
                state.status = AssignmentsListStatus.LOADING
                state.error = null
            })
            .addCase(addAssignment.fulfilled, (state, action: PayloadAction<AssignmentData>) => {
                state.status = AssignmentsListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(addAssignment.rejected, (state, action: PayloadAction<any>) => {
                state.status = AssignmentsListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default assignmentsAddSlice.reducer
