import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateQuizLevel } from "./thunk";
import { QuizLevelUpdateState } from "../../../types/quizLevels/update";
import { QuizLevelListStatus } from "../../../enums/quizLevels/list";

const initialState: QuizLevelUpdateState = {
    data: null,
    status: QuizLevelListStatus.IDLE,
    error: null,
};

const quizLevelUpdateSlice = createSlice({
    name: "quizLevelUpdate",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateQuizLevel.pending, (state) => {
                state.status = QuizLevelListStatus.LOADING;
                state.error = null;
            })
            .addCase(updateQuizLevel.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = QuizLevelListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(updateQuizLevel.rejected, (state, action: PayloadAction<any>) => {
                state.status = QuizLevelListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default quizLevelUpdateSlice.reducer;