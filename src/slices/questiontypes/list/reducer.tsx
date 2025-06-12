import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchQuestionTypes } from './thunk';
import { ListQuestionTypeResponse } from '../../../types/questiontypes/list';
import { QuestionTypeListStatus } from '../../../enums/questiontypes/list';

export interface QuestionTypeListState {
    data: ListQuestionTypeResponse['data'] | null;
    links: ListQuestionTypeResponse['links'] | null;
    meta: ListQuestionTypeResponse['meta'] | null;
    status: QuestionTypeListStatus;
    error: string | null;
}

const initialState: QuestionTypeListState = {
    data: null,
    links: null,
    meta: null,
    status: QuestionTypeListStatus.IDLE,
    error: null,
};

const questionTypeListSlice = createSlice({
    name: 'questionTypes/list',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchQuestionTypes.pending, (state) => {
            state.status = QuestionTypeListStatus.LOADING;
            state.error = null;
        });
        builder.addCase(fetchQuestionTypes.fulfilled, (state, action: PayloadAction<ListQuestionTypeResponse>) => {
            state.status = QuestionTypeListStatus.SUCCEEDED;
            state.data = action.payload.data;
            state.links = action.payload.links;
            state.meta = action.payload.meta;
        });
        builder.addCase(fetchQuestionTypes.rejected, (state, action: PayloadAction<any>) => {
            state.status = QuestionTypeListStatus.FAILED;
            state.error = action.payload || 'Fetch question types failed';
        });
    },
});

export default questionTypeListSlice.reducer;
