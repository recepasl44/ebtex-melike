import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StudentGroupsUpdateState } from '../../../types/studentGroup/update'
import StudentGroupListStatus from '../../../enums/studentGroup/list'
import { updateStudentGroup } from './thunk'

const initialState: StudentGroupsUpdateState = {
    data: null,
    status: StudentGroupListStatus.IDLE,
    error: null,
}

const studentGroupUpdateSlice = createSlice({
    name: 'studentGroupUpdate',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateStudentGroup.pending, (state) => {
                state.status = StudentGroupListStatus.LOADING
                state.error = null
            })
            .addCase(updateStudentGroup.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = StudentGroupListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(updateStudentGroup.rejected, (state, action: PayloadAction<any>) => {
                state.status = StudentGroupListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default studentGroupUpdateSlice.reducer
