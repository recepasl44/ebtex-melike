
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { fetchQuizClassroom } from "../../../slices/quizClassroom/detail/thunk";
import { updateQuizClassroom } from "../../../slices/quizClassroom/update/thunk";
import { IQuizClassroomUpdatePayload } from "../../../types/quizClassroom/update";
import { QuizClassroom } from "../../../types/quizClassroom/list";

export function useQuizClassroomDetail() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector(
        (state: RootState) => state.quizClassroomDetail
    );

    const getQuizClassroom = useCallback(
        async (quizClassroomId: number): Promise<QuizClassroom | null> => {
            const action = await dispatch(fetchQuizClassroom(quizClassroomId));
            return fetchQuizClassroom.fulfilled.match(action)
                ? action.payload
                : null;
        },
        [dispatch]
    );

    const updateExistingQuizClassroom = useCallback(
        async (
            updatePayload: IQuizClassroomUpdatePayload
        ): Promise<QuizClassroom | null> => {
            const action = await dispatch(updateQuizClassroom(updatePayload));
            return updateQuizClassroom.fulfilled.match(action)
                ? action.payload
                : null;
        },
        [dispatch]
    );

    return { quizClassroom: data, status, error, getQuizClassroom, updateExistingQuizClassroom };
}
