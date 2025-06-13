import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteUnit } from './thunk';
import { UnitsDeleteState } from '../../../types/units/delete';
import { UnitsListStatus } from '../../../enums/units/list';

const initialState: UnitsDeleteState = {
    data: null,
    status: UnitsListStatus.IDLE,
    error: null,
};

const unitsDeleteSlice = createSlice({
    name: 'unitsDelete',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteUnit.pending, (state) => {
                state.status = UnitsListStatus.LOADING;
                state.error = null;
            })
            .addCase(deleteUnit.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = UnitsListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(deleteUnit.rejected, (state, action: PayloadAction<any>) => {
                state.status = UnitsListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default unitsDeleteSlice.reducer;
