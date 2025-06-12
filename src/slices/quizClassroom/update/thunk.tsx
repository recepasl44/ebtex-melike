import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { QUIZ_CLASSROOMS } from "../../../helpers/url_helper";
import { QuizClassroom } from "../../../types/quizClassroom/list";
import { IQuizClassroomUpdatePayload } from "../../../types/quizClassroom/update";

export const updateQuizClassroom = createAsyncThunk<QuizClassroom, IQuizClassroomUpdatePayload>(
    "quizClassroom/updateQuizClassroom",
    async ({ quizClassroomId, payload }, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.put(`${QUIZ_CLASSROOMS}/${quizClassroomId}`, payload);
            return resp.data.data as QuizClassroom;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || "Update quiz classroom failed"
            );
        }
    }
);
