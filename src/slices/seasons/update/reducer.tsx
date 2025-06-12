import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateSeason } from './thunk';
import { SeasonsUpdateState } from '../../../types/seasons/update';
import { SeasonListStatus } from '../../../enums/seasons/list';


const initialState: SeasonsUpdateState = {
    data: null,
    status: SeasonListStatus.IDLE,
    error: null,
};
const seasonsUpdateSlice = createSlice({
    name: 'seasonsUpdate',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateSeason.pending, (state) => {
                state.status = SeasonListStatus.LOADING;
                state.error = null;
            })
            .addCase(updateSeason.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = SeasonListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(updateSeason.rejected, (state, action: PayloadAction<any>) => {
                state.status = SeasonListStatus.FAILED;
                state.error = action.payload;
            });
    }
});
export default seasonsUpdateSlice.reducer;