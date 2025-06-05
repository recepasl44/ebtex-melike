import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addUnit } from './thunk';
import { UnitsAddState } from '../../../types/units/add';
import { UnitsListStatus } from '../../../enums/units/list';

const initialState: UnitsAddState = {
    data: null,
    status: UnitsListStatus.IDLE,
    error: null,
};

const unitsAddSlice = createSlice({
    name: 'unitsAdd',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addUnit.pending, (state) => {
                state.status = UnitsListStatus.LOADING;
                state.error = null;
            })
            .addCase(addUnit.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = UnitsListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(addUnit.rejected, (state, action: PayloadAction<any>) => {
                state.status = UnitsListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default unitsAddSlice.reducer;
