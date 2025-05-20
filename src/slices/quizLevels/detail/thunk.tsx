import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { QUIZ_LEVELS } from "../../../helpers/url_helper";
import { QuizLevel } from "../../../types/quizLevels/list";

export const fetchQuizLevel = createAsyncThunk<QuizLevel, number>(
    "quizLevel/fetchQuizLevel",
    async (quizLevelId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${QUIZ_LEVELS}/${quizLevelId}`);
            return response.data.data as QuizLevel;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Fetch quiz level failed"
            );
        }
    }
);

