import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateQuizTime } from "./thunk";
import { QuizTimeUpdateState } from "../../../types/quizTimes/update";
import { QuizTimeListStatus } from "../../../enums/quizTimes/list";
import { IQuizTime } from "../../../types/quizTimes/list";

const initialState: QuizTimeUpdateState = {
    data: null,
    status: QuizTimeListStatus.IDLE,
    error: null,
};

const quizTimeUpdateSlice = createSlice({
    name: "quizTimeUpdate",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateQuizTime.pending, (state) => {
                state.status = QuizTimeListStatus.LOADING;
                state.error = null;
            })
            .addCase(updateQuizTime.fulfilled, (state, action: PayloadAction<IQuizTime>) => {
                state.status = QuizTimeListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(updateQuizTime.rejected, (state, action: PayloadAction<any>) => {
                state.status = QuizTimeListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default quizTimeUpdateSlice.reducer;