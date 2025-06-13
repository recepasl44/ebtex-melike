import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { QUIZ_TIMES } from "../../../helpers/url_helper";
import { QuizTimeDeleteState } from "../../../types/quizTimes/delete";

export const deleteQuizTime = createAsyncThunk<QuizTimeDeleteState, number>(
    "quizTime/deleteQuizTime",
    async (quizTimeId, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.delete(`${QUIZ_TIMES}/${quizTimeId}`);
            return resp.data as QuizTimeDeleteState;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || "Delete quiz time failed"
            );
        }
    }
);
