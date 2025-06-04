import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchStudentGroup } from './thunk'
import { StudentGroupDetailState } from '../../../types/studentGroup/detail'
import StudentGroupListStatus from '../../../enums/studentGroup/list'

const initialState: StudentGroupDetailState = {
    data: null,
    status: StudentGroupListStatus.IDLE,
    error: null,
}

const studentGroupDetailSlice = createSlice({
    name: 'studentGroupDetail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStudentGroup.pending, (state) => {
                state.status = StudentGroupListStatus.LOADING
                state.error = null
            })
            .addCase(fetchStudentGroup.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = StudentGroupListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(fetchStudentGroup.rejected, (state, action: PayloadAction<any>) => {
                state.status = StudentGroupListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default studentGroupDetailSlice.reducer
