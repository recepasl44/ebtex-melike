import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addQuizClassroom } from "./thunk";
import { QuizClassroomAddState } from "../../../types/quizClassroom/add";
import { QuizClassroomListStatus } from "../../../enums/quizClassroom/list";
import { QuizClassroom } from "../../../types/quizClassroom/list";

const initialState: QuizClassroomAddState = {
    data: null,
    status: QuizClassroomListStatus.IDLE,
    error: null,
};

const quizClassroomAddSlice = createSlice({
    name: "quizClassroomAdd",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addQuizClassroom.pending, (state) => {
                state.status = QuizClassroomListStatus.LOADING;
                state.error = null;
            })
            .addCase(addQuizClassroom.fulfilled, (state, action: PayloadAction<QuizClassroom>) => {
                state.status = QuizClassroomListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(addQuizClassroom.rejected, (state, action: PayloadAction<any>) => {
                state.status = QuizClassroomListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default quizClassroomAddSlice.reducer;