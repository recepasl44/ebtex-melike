import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { QUIZ_CLASSROOMS } from "../../../helpers/url_helper";
import { QuizClassroomDeleteState } from "../../../types/quizClassroom/delete";

export const deleteQuizClassroom = createAsyncThunk<QuizClassroomDeleteState, number>(
    "quizClassroom/deleteQuizClassroom",
    async (quizClassroomId, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.delete(`${QUIZ_CLASSROOMS}/${quizClassroomId}`);
            return resp.data as QuizClassroomDeleteState;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || "Delete quiz classroom failed"
            );
        }
    }
);
