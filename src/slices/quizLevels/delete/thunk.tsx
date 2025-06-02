import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { QUIZ_LEVELS } from "../../../helpers/url_helper";
import { QuizLevelDeleteState } from "../../../types/quizLevels/delete";

export const deleteQuizLevel = createAsyncThunk<QuizLevelDeleteState, number>(
    "quizLevel/deleteQuizLevel",
    async (quizLevelId, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.delete(`${QUIZ_LEVELS}/${quizLevelId}`);
            return resp.data as QuizLevelDeleteState;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || "Delete quiz level failed"
            );
        }
    }
);
