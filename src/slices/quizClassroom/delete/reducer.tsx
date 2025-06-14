import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteQuizClassroom } from "./thunk";
import { QuizClassroomDeleteState } from "../../../types/quizClassroom/delete";
import { QuizClassroomListStatus } from "../../../enums/quizClassroom/list";

const initialState: QuizClassroomDeleteState = {
    data: null,
    status: QuizClassroomListStatus.IDLE,
    error: null
}

const quizClassroomDeleteSlice = createSlice({
    name: "quizClassroomDelete",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(deleteQuizClassroom.pending, (state) => {
            state.status = QuizClassroomListStatus.LOADING;
        })
            .addCase(deleteQuizClassroom.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = QuizClassroomListStatus.SUCCEEDED;
                state.data = action.payload.data;
            })
            .addCase(deleteQuizClassroom.rejected, (state, action: PayloadAction<any>) => {
                state.status = QuizClassroomListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default quizClassroomDeleteSlice.reducer;