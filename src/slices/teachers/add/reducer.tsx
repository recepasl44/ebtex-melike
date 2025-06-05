import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addTeacher } from './thunk';
import { TeachersAddState } from '../../../types/teachers/add';
import { TeachersListStatus } from '../../../enums/teachers/list';

const initialState: TeachersAddState = {
    data: null,
    status: TeachersListStatus.IDLE,
    error: null,
};

const teacherAddSlice = createSlice({
    name: 'teacherAdd',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addTeacher.pending, (state) => {
                state.status = TeachersListStatus.LOADING;
                state.error = null;
            })
            .addCase(addTeacher.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = TeachersListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(addTeacher.rejected, (state, action: PayloadAction<any>) => {
                state.status = TeachersListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default teacherAddSlice.reducer;
