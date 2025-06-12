import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchSeason } from './thunk';
import { SeasonShowState } from '../../../types/seasons/detail';
import { SeasonListStatus } from '../../../enums/seasons/list';

const initialState: SeasonShowState = {
    data: null,
    status: SeasonListStatus.IDLE,
    error: null,
};
const seasonShowSlice = createSlice({
    name: 'seasonShow',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSeason.pending, (state) => {
                state.status = SeasonListStatus.LOADING;
                state.error = null;
            })
            .addCase(fetchSeason.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = SeasonListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(fetchSeason.rejected, (state, action: PayloadAction<any>) => {
                state.status = SeasonListStatus.FAILED;
                state.error = action.payload;
            });
    }
});
export default seasonShowSlice.reducer;
