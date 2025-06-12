import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QuizLevelListState, QuizLevelsListResponse } from "../../../types/quizLevels/list";
import { QuizLevelListStatus } from "../../../enums/quizLevels/list";
import { fetchQuizLevels } from "./thunk";

const initialState: QuizLevelListState = {
    data: null,
    meta: null,
    status: QuizLevelListStatus.IDLE,
    error: null,
};

const quizLevelListSlice = createSlice({
    name: "quizLevelList",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuizLevels.pending, (state) => {
                state.status = QuizLevelListStatus.LOADING;
                state.error = null;
            })
            .addCase(
                fetchQuizLevels.fulfilled,
                (state, action: PayloadAction<QuizLevelsListResponse>) => {
                    state.status = QuizLevelListStatus.SUCCEEDED;
                    state.data = action.payload.data;
                    state.meta = action.payload.meta;
                }
            )
            .addCase(fetchQuizLevels.rejected, (state, action: PayloadAction<any>) => {
                state.status = QuizLevelListStatus.FAILED;
                state.error = action.payload || "Fetch quiz levels failed";
            });
    },
});

export default quizLevelListSlice.reducer;
