import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchGroupType } from './thunk'
import { GroupTypeDetailState } from '../../../types/grouptype/detail'
import GroupTypeListStatus from '../../../enums/grouptype/list'

const initialState: GroupTypeDetailState = {
    data: null,
    status: GroupTypeListStatus.IDLE,
    error: null,
}

const groupTypeDetailSlice = createSlice({
    name: 'grouptypeDetail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGroupType.pending, (state) => {
                state.status = GroupTypeListStatus.LOADING
                state.error = null
            })
            .addCase(fetchGroupType.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = GroupTypeListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(fetchGroupType.rejected, (state, action: PayloadAction<any>) => {
                state.status = GroupTypeListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default groupTypeDetailSlice.reducer
