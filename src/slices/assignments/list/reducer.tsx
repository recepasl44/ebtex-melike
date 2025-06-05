import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchAssignments } from './thunk'
import { ListAssignmentsResponse } from '../../../types/assignments/list'
import { AssignmentsListStatus } from '../../../enums/assignments/list'

export interface AssignmentsListState {
    data: ListAssignmentsResponse['data'] | null
    links: ListAssignmentsResponse['links'] | null
    meta: ListAssignmentsResponse['meta'] | null
    status: AssignmentsListStatus
    error: string | null
}

const initialState: AssignmentsListState = {
    data: null,
    links: null,
    meta: null,
    status: AssignmentsListStatus.IDLE,
    error: null,
}

const assignmentsListSlice = createSlice({
    name: 'assignments/list',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAssignments.pending, (state) => {
            state.status = AssignmentsListStatus.LOADING
            state.error = null
        })
        builder.addCase(fetchAssignments.fulfilled, (state, action: PayloadAction<ListAssignmentsResponse>) => {
            state.status = AssignmentsListStatus.SUCCEEDED
            state.data = action.payload.data
            state.links = action.payload.links
            state.meta = action.payload.meta
        })
        builder.addCase(fetchAssignments.rejected, (state, action: PayloadAction<any>) => {
            state.status = AssignmentsListStatus.FAILED
            state.error = action.payload || 'Fetch assignments failed'
        })
    },
})

export default assignmentsListSlice.reducer
