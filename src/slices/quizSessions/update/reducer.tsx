import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateQuizSession } from "./thunk";
import { QuizSessionUpdateState } from "../../../types/quizSessions/update";
import { QuizSessionListStatus } from "../../../enums/quizSessions/list";
import { IQuizSession } from "../../../types/quizSessions/list";

const initialState: QuizSessionUpdateState = {
    data: null,
    status: QuizSessionListStatus.IDLE,
    error: null,
};

const quizSessionUpdateSlice = createSlice({
    name: "quizSessionUpdate",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateQuizSession.pending, (state) => {
                state.status = QuizSessionListStatus.LOADING;
                state.error = null;
            })
            .addCase(updateQuizSession.fulfilled, (state, action: PayloadAction<IQuizSession>) => {
                state.status = QuizSessionListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(updateQuizSession.rejected, (state, action: PayloadAction<any>) => {
                state.status = QuizSessionListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default quizSessionUpdateSlice.reducer;