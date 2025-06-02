import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateUnit } from './thunk';
import { UnitsUpdateState } from '../../../types/units/update';
import { UnitsListStatus } from '../../../enums/units/list';

const initialState: UnitsUpdateState = {
    data: null,
    status: UnitsListStatus.IDLE,
    error: null,
};

const unitsUpdateSlice = createSlice({
    name: 'unitsUpdate',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateUnit.pending, (state) => {
                state.status = UnitsListStatus.LOADING;
                state.error = null;
            })
            .addCase(updateUnit.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = UnitsListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(updateUnit.rejected, (state, action: PayloadAction<any>) => {
                state.status = UnitsListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default unitsUpdateSlice.reducer;
