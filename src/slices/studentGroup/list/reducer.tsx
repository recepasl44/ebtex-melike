import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchStudentGroups } from './thunk'
import { ListStudentGroupsResponse } from '../../../types/studentGroup/list'
import StudentGroupListStatus from '../../../enums/studentGroup/list'

export interface StudentGroupListState {
    data: ListStudentGroupsResponse['data'] | null
    links: ListStudentGroupsResponse['links'] | null
    meta: ListStudentGroupsResponse['meta'] | null
    status: StudentGroupListStatus
    error: string | null
}

const initialState: StudentGroupListState = {
    data: null,
    links: null,
    meta: null,
    status: StudentGroupListStatus.IDLE,
    error: null,
}

const studentGroupListSlice = createSlice({
    name: 'studentGroup/list',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStudentGroups.pending, (state) => {
                state.status = StudentGroupListStatus.LOADING
                state.error = null
            })
            .addCase(fetchStudentGroups.fulfilled, (state, action: PayloadAction<ListStudentGroupsResponse>) => {
                state.status = StudentGroupListStatus.SUCCEEDED
                state.data = action.payload.data
                state.links = action.payload.links
                state.meta = action.payload.meta
            })
            .addCase(fetchStudentGroups.rejected, (state, action: PayloadAction<any>) => {
                state.status = StudentGroupListStatus.FAILED
                state.error = action.payload || 'Fetch student groups failed'
            })
    },
})

export default studentGroupListSlice.reducer
