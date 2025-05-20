import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addQuizLevel } from "./thunk";
import { QuizLevelAddState } from "../../../types/quizLevels/add";
import { QuizLevelListStatus } from "../../../enums/quizLevels/list";
import { QuizLevel } from "../../../types/quizLevels/list";

const initialState: QuizLevelAddState = {
    data: null,
    status: QuizLevelListStatus.IDLE,
    error: null,
};

const quizLevelAddSlice = createSlice({
    name: "quizLevelAdd",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addQuizLevel.pending, (state) => {
                state.status = QuizLevelListStatus.LOADING;
                state.error = null;
            })
            .addCase(addQuizLevel.fulfilled, (state, action: PayloadAction<QuizLevel>) => {
                state.status = QuizLevelListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(addQuizLevel.rejected, (state, action: PayloadAction<any>) => {
                state.status = QuizLevelListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default quizLevelAddSlice.reducer;