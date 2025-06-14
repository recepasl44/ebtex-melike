// src/slices/quizClassroom/list/thunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { QUIZ_CLASSROOMS } from "../../../helpers/url_helper";
import {
    QuizClassroomsListResponse,
    QuizClassroomListArg,
} from "../../../types/quizClassroom/list";

export const fetchQuizClassrooms = createAsyncThunk<
    QuizClassroomsListResponse,
    QuizClassroomListArg
>(
    "quizClassrooms/fetchQuizClassrooms",
    async (queryParams, { rejectWithValue }) => {
        try {
            // sadece tanımlı (!== null && !== undefined) parametreleri ekleyelim
            const qp = new URLSearchParams();
            Object.entries(queryParams).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    qp.append(key, String(value));
                }
            });

            const url = `${QUIZ_CLASSROOMS}?${qp.toString()}`;
            const resp = await axiosInstance.get(url);
            return resp.data as QuizClassroomsListResponse;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || "Fetch quiz classrooms failed"
            );
        }
    }
);
