// src/components/hooks/quizClassroom/useQuizClassroomUpdate.tsx
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { updateQuizClassroom } from "../../../slices/quizClassroom/update/thunk";
import { IQuizClassroomUpdatePayload } from "../../../types/quizClassroom/update";
import { QuizClassroom } from "../../../types/quizClassroom/list";

export function useQuizClassroomUpdate() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector(
        (state: RootState) => state.quizClassroomUpdate
    );

    const updateExistingQuizClassroom = useCallback(
        async (
            payload: IQuizClassroomUpdatePayload
        ): Promise<QuizClassroom | null> => {
            const action = await dispatch(updateQuizClassroom(payload));
            return updateQuizClassroom.fulfilled.match(action)
                ? action.payload
                : null;
        },
        [dispatch]
    );

    return { updatedQuizClassroom: data, status, error, updateExistingQuizClassroom };
}
