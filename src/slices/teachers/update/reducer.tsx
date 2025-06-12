import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateTeacher } from './thunk';
import { TeachersUpdateState } from '../../../types/teachers/update';
import { TeachersListStatus } from '../../../enums/teachers/list';

const initialState: TeachersUpdateState = {
    data: null,
    status: TeachersListStatus.IDLE,
    error: null,
};

const teachersUpdateSlice = createSlice({
    name: 'teachersUpdate',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateTeacher.pending, (state) => {
                state.status = TeachersListStatus.LOADING;
                state.error = null;
            })
            .addCase(updateTeacher.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = TeachersListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(updateTeacher.rejected, (state, action: PayloadAction<any>) => {
                state.status = TeachersListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default teachersUpdateSlice.reducer;
