import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QuizSessionListState, QuizSessionsListResponse } from "../../../types/quizSessions/list";
import { QuizSessionListStatus } from "../../../enums/quizSessions/list";
import { fetchQuizSessions } from "./thunk";

const initialState: QuizSessionListState = {
    data: null,
    meta: null,
    status: QuizSessionListStatus.IDLE,
    error: null,
};

const quizSessionListSlice = createSlice({
    name: "quizSessionList",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuizSessions.pending, (state) => {
                state.status = QuizSessionListStatus.LOADING;
                state.error = null;
            })
            .addCase(
                fetchQuizSessions.fulfilled,
                (state, action: PayloadAction<QuizSessionsListResponse>) => {
                    state.status = QuizSessionListStatus.SUCCEEDED;
                    state.data = action.payload.data;
                    state.meta = action.payload.meta;
                }
            )
            .addCase(fetchQuizSessions.rejected, (state, action: PayloadAction<any>) => {
                state.status = QuizSessionListStatus.FAILED;
                state.error = action.payload || "Fetch quiz sessions failed";
            });
    },
});

export default quizSessionListSlice.reducer;
