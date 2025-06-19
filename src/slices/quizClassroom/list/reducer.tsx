import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QuizClassroomListState, QuizClassroomsListResponse } from "../../../types/quizClassroom/list";
import { QuizClassroomListStatus } from "../../../enums/quizClassroom/list";
import { fetchQuizClassrooms } from "./thunk";

const initialState: QuizClassroomListState = {
    data: null,
    meta: null,
    links: null,
    status: QuizClassroomListStatus.IDLE,
    error: null,
};

const quizClassroomListSlice = createSlice({
    name: "quizClassroomList",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuizClassrooms.pending, (state) => {
                state.status = QuizClassroomListStatus.LOADING;
                state.error = null;
            })
            .addCase(
                fetchQuizClassrooms.fulfilled,
                (state, action: PayloadAction<QuizClassroomsListResponse>) => {
                    state.status = QuizClassroomListStatus.SUCCEEDED;
                    state.data = action.payload.data;
                    state.meta = action.payload.meta;
                    state.links = action.payload.links;
                }
            )
            .addCase(fetchQuizClassrooms.rejected, (state, action: PayloadAction<any>) => {
                state.status = QuizClassroomListStatus.FAILED;
                state.error = action.payload || "Fetch quiz classrooms failed";
            });
    },
});

export default quizClassroomListSlice.reducer;