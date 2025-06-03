import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchQuizSession } from "./thunk";
import { QuizSessionShowState } from "../../../types/quizSessions/detail";
import { QuizSessionListStatus } from "../../../enums/quizSessions/list";

const initialState: QuizSessionShowState = {
    data: null,
    status: QuizSessionListStatus.IDLE,
    error: null,
};

const quizSessionShowSlice = createSlice({
    name: "quizSessionShow",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuizSession.pending, (state) => {
                state.status = QuizSessionListStatus.LOADING;
                state.error = null;
            })
            .addCase(fetchQuizSession.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = QuizSessionListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(fetchQuizSession.rejected, (state, action: PayloadAction<any>) => {
                state.status = QuizSessionListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default quizSessionShowSlice.reducer;