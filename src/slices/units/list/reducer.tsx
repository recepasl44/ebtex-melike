import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUnits } from './thunk';
import { ListUnitResponse } from '../../../types/units/list';
import { UnitsListStatus } from '../../../enums/units/list';

export interface UnitsListState {
    data: ListUnitResponse['data'] | null;
    links: ListUnitResponse['links'] | null;
    meta: ListUnitResponse['meta'] | null;
    status: UnitsListStatus;
    error: string | null;
}

const initialState: UnitsListState = {
    data: null,
    links: null,
    meta: null,
    status: UnitsListStatus.IDLE,
    error: null,
};

const unitsListSlice = createSlice({
    name: 'units/list',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUnits.pending, (state) => {
            state.status = UnitsListStatus.LOADING;
            state.error = null;
        });
        builder.addCase(fetchUnits.fulfilled, (state, action: PayloadAction<ListUnitResponse>) => {
            state.status = UnitsListStatus.SUCCEEDED;
            state.data = action.payload.data;
            state.links = action.payload.links;
            state.meta = action.payload.meta;
        });
        builder.addCase(fetchUnits.rejected, (state, action: PayloadAction<any>) => {
            state.status = UnitsListStatus.FAILED;
            state.error = action.payload || 'Fetch units failed';
        });
    },
});

export default unitsListSlice.reducer;
