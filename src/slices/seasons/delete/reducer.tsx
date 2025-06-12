import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteSeason } from './thunk';
import { SeasonsDeleteState } from '../../../types/seasons/delete';
import { SeasonListStatus } from '../../../enums/seasons/list';


const initialState: SeasonsDeleteState = {
    data: null,
    status: SeasonListStatus.IDLE,
    error: null,
};

const seasonsDeleteSlice = createSlice({
    name: 'seasonsDelete',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteSeason.pending, (state) => {
                state.status = SeasonListStatus.LOADING;
                state.error = null;
            })
            .addCase(deleteSeason.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = SeasonListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(deleteSeason.rejected, (state, action: PayloadAction<any>) => {
                state.status = SeasonListStatus.FAILED;
                state.error = action.payload;
            });
    }
});

export default seasonsDeleteSlice.reducer;