import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteQuizSession } from "./thunk";
import { QuizSessionDeleteState } from "../../../types/quizSessions/delete";
import { QuizSessionListStatus } from "../../../enums/quizSessions/list";

const initialState: QuizSessionDeleteState = {
    data: null,
    status: QuizSessionListStatus.IDLE,
    error: null
}

const quizSessionDeleteSlice = createSlice({
    name: "quizSessionsDelete",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(deleteQuizSession.pending, (state) => {
            state.status = QuizSessionListStatus.LOADING;
        })
            .addCase(deleteQuizSession.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = QuizSessionListStatus.SUCCEEDED;
                state.data = action.payload.data;
            })
            .addCase(deleteQuizSession.rejected, (state, action: PayloadAction<any>) => {
                state.status = QuizSessionListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default quizSessionDeleteSlice.reducer;