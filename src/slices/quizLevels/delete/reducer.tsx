import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteQuizLevel } from "./thunk";
import { QuizLevelDeleteState } from "../../../types/quizLevels/delete";
import { QuizLevelListStatus } from "../../../enums/quizLevels/list";

const initialState: QuizLevelDeleteState = {
    data: null,
    status: QuizLevelListStatus.IDLE,
    error: null
}

const quizLevelDeleteSlice = createSlice({
    name: "quizLevelDelete",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(deleteQuizLevel.pending, (state) => {
            state.status = QuizLevelListStatus.LOADING;
        })
            .addCase(deleteQuizLevel.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = QuizLevelListStatus.SUCCEEDED;
                state.data = action.payload.data;
            })
            .addCase(deleteQuizLevel.rejected, (state, action: PayloadAction<any>) => {
                state.status = QuizLevelListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default quizLevelDeleteSlice.reducer;