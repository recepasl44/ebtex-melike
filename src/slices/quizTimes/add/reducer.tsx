import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addQuizTime } from "./thunk";
import { QuizTimeAddState } from "../../../types/quizTimes/add";
import { QuizTimeListStatus } from "../../../enums/quizTimes/list";
import { IQuizTime } from "../../../types/quizTimes/list";

const initialState: QuizTimeAddState = {
    data: null,
    status: QuizTimeListStatus.IDLE,
    error: null,
};

const quizTimeAddSlice = createSlice({
    name: "quizTimeAdd",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addQuizTime.pending, (state) => {
                state.status = QuizTimeListStatus.LOADING;
                state.error = null;
            })
            .addCase(addQuizTime.fulfilled, (state, action: PayloadAction<IQuizTime>) => {
                state.status = QuizTimeListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(addQuizTime.rejected, (state, action: PayloadAction<any>) => {
                state.status = QuizTimeListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default quizTimeAddSlice.reducer;
