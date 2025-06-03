import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QuizTimeListState, QuizTimesListResponse } from "../../../types/quizTimes/list";
import { QuizTimeListStatus } from "../../../enums/quizTimes/list";
import { fetchQuizTimes } from "./thunk";

const initialState: QuizTimeListState = {
    data: null,
    meta: null,
    status: QuizTimeListStatus.IDLE,
    error: null,
};

const quizTimeListSlice = createSlice({
    name: "quizTimeList",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuizTimes.pending, (state) => {
                state.status = QuizTimeListStatus.LOADING;
                state.error = null;
            })
            .addCase(
                fetchQuizTimes.fulfilled,
                (state, action: PayloadAction<QuizTimesListResponse>) => {
                    state.status = QuizTimeListStatus.SUCCEEDED;
                    state.data = action.payload.data;
                    state.meta = action.payload.meta;
                }
            )
            .addCase(fetchQuizTimes.rejected, (state, action: PayloadAction<any>) => {
                state.status = QuizTimeListStatus.FAILED;
                state.error = action.payload || "Fetch quiz times failed";
            });
    },
});

export default quizTimeListSlice.reducer;
