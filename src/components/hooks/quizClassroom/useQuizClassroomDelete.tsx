
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { deleteQuizClassroom } from "../../../slices/quizClassroom/delete/thunk";

export function useQuizClassroomDelete() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector(
        (state: RootState) => state.quizClassroomDelete
    );

    const removeQuizClassroom = useCallback(
        async (quizClassroomId: number) => {
            const action = await dispatch(deleteQuizClassroom(quizClassroomId));
            return deleteQuizClassroom.fulfilled.match(action)
                ? action.payload
                : null;
        },
        [dispatch]
    );

    return { deletedQuizClassroom: data, status, error, removeQuizClassroom };
}
