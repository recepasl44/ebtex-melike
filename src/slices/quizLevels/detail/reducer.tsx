import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchQuizLevel } from "./thunk";
import { QuizLevelDetailState } from "../../../types/quizLevels/detail";
import { QuizLevelListStatus } from "../../../enums/quizLevels/list";

const initialState: QuizLevelDetailState = {
    data: null,
    status: QuizLevelListStatus.IDLE,
    error: null,
};

const quizLevelDetailSlice = createSlice({
    name: "quizLevelDetail",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuizLevel.pending, (state) => {
                state.status = QuizLevelListStatus.LOADING;
                state.error = null;
            })
            .addCase(fetchQuizLevel.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = QuizLevelListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(fetchQuizLevel.rejected, (state, action: PayloadAction<any>) => {
                state.status = QuizLevelListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default quizLevelDetailSlice.reducer;