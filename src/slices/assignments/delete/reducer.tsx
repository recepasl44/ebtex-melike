import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { deleteAssignment } from './thunk'
import { AssignmentsDeleteState } from '../../../types/assignments/delete'
import { AssignmentsListStatus } from '../../../enums/assignments/list'

const initialState: AssignmentsDeleteState = {
    data: null,
    status: AssignmentsListStatus.IDLE,
    error: null,
}

const assignmentsDeleteSlice = createSlice({
    name: 'assignmentsDelete',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteAssignment.pending, (state) => {
                state.status = AssignmentsListStatus.LOADING
                state.error = null
            })
            .addCase(deleteAssignment.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = AssignmentsListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(deleteAssignment.rejected, (state, action: PayloadAction<any>) => {
                state.status = AssignmentsListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default assignmentsDeleteSlice.reducer
