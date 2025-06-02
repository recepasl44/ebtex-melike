import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addStudentGroup } from './thunk'
import { StudentGroupsAddState } from '../../../types/studentGroup/add'
import StudentGroupListStatus from '../../../enums/studentGroup/list'

const initialState: StudentGroupsAddState = {
    data: null,
    status: StudentGroupListStatus.IDLE,
    error: null,
}

const studentGroupAddSlice = createSlice({
    name: 'studentGroupAdd',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addStudentGroup.pending, (state) => {
                state.status = StudentGroupListStatus.LOADING
                state.error = null
            })
            .addCase(addStudentGroup.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = StudentGroupListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(addStudentGroup.rejected, (state, action: PayloadAction<any>) => {
                state.status = StudentGroupListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default studentGroupAddSlice.reducer
