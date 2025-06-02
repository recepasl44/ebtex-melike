import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchQuizClassroom } from "./thunk";
import { QuizClassroomDetailState } from "../../../types/quizClassroom/detail";
import { QuizClassroomListStatus } from "../../../enums/quizClassroom/list";

const initialState: QuizClassroomDetailState = {
    data: null,
    status: QuizClassroomListStatus.IDLE,
    error: null,
};

const quizClassroomDetailSlice = createSlice({
    name: "quizClassroomDetail",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuizClassroom.pending, (state) => {
                state.status = QuizClassroomListStatus.LOADING;
                state.error = null;
            })
            .addCase(fetchQuizClassroom.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = QuizClassroomListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(fetchQuizClassroom.rejected, (state, action: PayloadAction<any>) => {
                state.status = QuizClassroomListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default quizClassroomDetailSlice.reducer;