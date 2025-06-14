import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateQuizClassroom } from "./thunk";
import { QuizClassroomUpdateState } from "../../../types/quizClassroom/update";
import { QuizClassroomListStatus } from "../../../enums/quizClassroom/list";

const initialState: QuizClassroomUpdateState = {
    data: null,
    status: QuizClassroomListStatus.IDLE,
    error: null,
};

const quizClassroomUpdateSlice = createSlice({
    name: "quizClassroomUpdate",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateQuizClassroom.pending, (state) => {
                state.status = QuizClassroomListStatus.LOADING;
                state.error = null;
            })
            .addCase(updateQuizClassroom.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = QuizClassroomListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(updateQuizClassroom.rejected, (state, action: PayloadAction<any>) => {
                state.status = QuizClassroomListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default quizClassroomUpdateSlice.reducer;