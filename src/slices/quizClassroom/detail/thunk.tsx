import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { QUIZ_CLASSROOMS } from "../../../helpers/url_helper";
import { QuizClassroom } from "../../../types/quizClassroom/list";

export const fetchQuizClassroom = createAsyncThunk<QuizClassroom, number>(
    "quizClassroom/fetchQuizClassroom",
    async (quizClassroomId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${QUIZ_CLASSROOMS}/${quizClassroomId}`);
            return response.data.data as QuizClassroom;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Fetch quiz classroom failed"
            );
        }
    }
);
