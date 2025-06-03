import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchQuizTime } from "./thunk";
import { QuizTimeShowState } from "../../../types/quizTimes/detail";
import { QuizTimeListStatus } from "../../../enums/quizTimes/list";

const initialState: QuizTimeShowState = {
    data: null,
    status: QuizTimeListStatus.IDLE,
    error: null,
};

const quizTimeShowSlice = createSlice({
    name: "quizTimeShow",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuizTime.pending, (state) => {
                state.status = QuizTimeListStatus.LOADING;
                state.error = null;
            })
            .addCase(fetchQuizTime.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = QuizTimeListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(fetchQuizTime.rejected, (state, action: PayloadAction<any>) => {
                state.status = QuizTimeListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default quizTimeShowSlice.reducer;