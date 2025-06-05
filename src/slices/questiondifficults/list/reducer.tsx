import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchQuestionDifficults } from './thunk';
import { ListQuestionDifficultResponse } from '../../../types/questiondifficults/list';
import { QuestionDifficultListStatus } from '../../../enums/questiondifficults/list';

export interface QuestionDifficultListState {
    data: ListQuestionDifficultResponse['data'] | null;
    links: ListQuestionDifficultResponse['links'] | null;
    meta: ListQuestionDifficultResponse['meta'] | null;
    status: QuestionDifficultListStatus;
    error: string | null;
}

const initialState: QuestionDifficultListState = {
    data: null,
    links: null,
    meta: null,
    status: QuestionDifficultListStatus.IDLE,
    error: null,
};

const questionDifficultListSlice = createSlice({
    name: 'questionDifficults/list',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchQuestionDifficults.pending, (state) => {
            state.status = QuestionDifficultListStatus.LOADING;
            state.error = null;
        });
        builder.addCase(fetchQuestionDifficults.fulfilled, (state, action: PayloadAction<ListQuestionDifficultResponse>) => {
            state.status = QuestionDifficultListStatus.SUCCEEDED;
            state.data = action.payload.data;
            state.links = action.payload.links;
            state.meta = action.payload.meta;
        });
        builder.addCase(fetchQuestionDifficults.rejected, (state, action: PayloadAction<any>) => {
            state.status = QuestionDifficultListStatus.FAILED;
            state.error = action.payload || 'Fetch question difficults failed';
        });
    },
});

export default questionDifficultListSlice.reducer;
