import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { QUIZ_CLASSROOMS } from "../../../helpers/url_helper";
import { IQuizClassroomAddPayload } from "../../../types/quizClassroom/add";
import { QuizClassroom } from "../../../types/quizClassroom/list";

export const addQuizClassroom = createAsyncThunk<QuizClassroom, IQuizClassroomAddPayload>(
    "quizClassroom/addQuizClassroom",
    async (payload, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.post(QUIZ_CLASSROOMS, payload);
            return resp.data.data as QuizClassroom;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || "Add quiz classroom failed"
            );
        }
    }
);
