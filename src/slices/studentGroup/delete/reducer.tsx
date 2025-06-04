import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { deleteStudentGroup } from './thunk'
import { StudentGroupsDeleteState } from '../../../types/studentGroup/delete'
import StudentGroupListStatus from '../../../enums/studentGroup/list'

const initialState: StudentGroupsDeleteState = {
    data: null,
    status: StudentGroupListStatus.IDLE,
    error: null,
}

const studentGroupDeleteSlice = createSlice({
    name: 'studentGroupDelete',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteStudentGroup.pending, (state) => {
                state.status = StudentGroupListStatus.LOADING
                state.error = null
            })
            .addCase(deleteStudentGroup.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = StudentGroupListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(deleteStudentGroup.rejected, (state, action: PayloadAction<any>) => {
                state.status = StudentGroupListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default studentGroupDeleteSlice.reducer
