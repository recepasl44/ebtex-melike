import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addSeason } from './thunk';
import { SeasonsAddState } from '../../../types/seasons/add';
import { SeasonListStatus } from '../../../enums/seasons/list';

const initialState: SeasonsAddState = {
    data: null,
    status: SeasonListStatus.IDLE,
    error: null,
};
const seasonsAddSlice = createSlice({
    name: 'seasonsAdd',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addSeason.pending, (state) => {
                state.status = SeasonListStatus.LOADING;
                state.error = null;
            })
            .addCase(addSeason.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = SeasonListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(addSeason.rejected, (state, action: PayloadAction<any>) => {
                state.status = SeasonListStatus.FAILED;
                state.error = action.payload;
            });
    },
});
export default seasonsAddSlice.reducer;