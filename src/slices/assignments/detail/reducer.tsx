import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchAssignment } from './thunk'
import { AssignmentsDetailState } from '../../../types/assignments/detail'
import { AssignmentsListStatus } from '../../../enums/assignments/list'
import { AssignmentData } from '../../../types/assignments/list'

const initialState: AssignmentsDetailState = {
    data: null,
    status: AssignmentsListStatus.IDLE,
    error: null,
}

const assignmentsDetailSlice = createSlice({
    name: 'assignmentsDetail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAssignment.pending, (state) => {
                state.status = AssignmentsListStatus.LOADING
                state.error = null
            })
            .addCase(fetchAssignment.fulfilled, (state, action: PayloadAction<AssignmentData>) => {
                state.status = AssignmentsListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(fetchAssignment.rejected, (state, action: PayloadAction<any>) => {
                state.status = AssignmentsListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default assignmentsDetailSlice.reducer
