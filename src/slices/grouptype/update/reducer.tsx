import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GroupTypesUpdateState } from '../../../types/grouptype/update'
import { updateGroupType } from './thunk'
import GroupTypeListStatus from '../../../enums/grouptype/list'

const initialState: GroupTypesUpdateState = {
    data: null,
    status: GroupTypeListStatus.IDLE,
    error: null,
}

const groupTypeUpdateSlice = createSlice({
    name: 'grouptypeUpdate',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateGroupType.pending, (state) => {
                state.status = GroupTypeListStatus.LOADING
                state.error = null
            })
            .addCase(updateGroupType.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = GroupTypeListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(updateGroupType.rejected, (state, action: PayloadAction<any>) => {
                state.status = GroupTypeListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default groupTypeUpdateSlice.reducer
