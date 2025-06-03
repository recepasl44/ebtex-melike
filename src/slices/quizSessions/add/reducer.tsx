import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addQuizSession } from "./thunk";
import { QuizSessionAddState } from "../../../types/quizSessions/add";
import { QuizSessionListStatus } from "../../../enums/quizSessions/list";
import { IQuizSession } from "../../../types/quizSessions/list";

const initialState: QuizSessionAddState = {
    data: null,
    status: QuizSessionListStatus.IDLE,
    error: null,
};

const quizSessionAddSlice = createSlice({
    name: "quizSessionAdd",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addQuizSession.pending, (state) => {
                state.status = QuizSessionListStatus.LOADING;
                state.error = null;
            })
            .addCase(addQuizSession.fulfilled, (state, action: PayloadAction<IQuizSession>) => {
                state.status = QuizSessionListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(addQuizSession.rejected, (state, action: PayloadAction<any>) => {
                state.status = QuizSessionListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default quizSessionAddSlice.reducer;
