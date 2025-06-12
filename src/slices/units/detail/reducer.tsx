import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUnit } from './thunk';
import { UnitShowState } from '../../../types/units/detail';
import { UnitsListStatus } from '../../../enums/units/list';

const initialState: UnitShowState = {
    data: null,
    status: UnitsListStatus.IDLE,
    error: null,
};

const unitShowSlice = createSlice({
    name: 'unitShow',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUnit.pending, (state) => {
                state.status = UnitsListStatus.LOADING;
                state.error = null;
            })
            .addCase(
                fetchUnit.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.status = UnitsListStatus.SUCCEEDED;
                    state.data = action.payload;
                }
            )
            .addCase(
                fetchUnit.rejected,
                (state, action: PayloadAction<any>) => {
                    state.status = UnitsListStatus.FAILED;
                    state.error = action.payload;
                }
            );
    },
});

export default unitShowSlice.reducer;
