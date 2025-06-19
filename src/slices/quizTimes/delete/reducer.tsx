import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteQuizTime } from "./thunk";
import { QuizTimeDeleteState } from "../../../types/quizTimes/delete";
import { QuizTimeListStatus } from "../../../enums/quizTimes/list";

const initialState: QuizTimeDeleteState = {
    data: null,
    status: QuizTimeListStatus.IDLE,
    error: null
}

const quizTimeDeleteSlice = createSlice({
    name: "quizTimesDelete",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(deleteQuizTime.pending, (state) => {
            state.status = QuizTimeListStatus.LOADING;
        })
            .addCase(deleteQuizTime.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = QuizTimeListStatus.SUCCEEDED;
                state.data = action.payload.data;
            })
            .addCase(deleteQuizTime.rejected, (state, action: PayloadAction<any>) => {
                state.status = QuizTimeListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default quizTimeDeleteSlice.reducer;