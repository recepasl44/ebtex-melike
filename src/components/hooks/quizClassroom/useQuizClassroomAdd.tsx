
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { addQuizClassroom } from "../../../slices/quizClassroom/add/thunk";
import { IQuizClassroomAddPayload } from "../../../types/quizClassroom/add";
import { QuizClassroom } from "../../../types/quizClassroom/list";

export function useQuizClassroomAdd() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector(
        (state: RootState) => state.quizClassroomAdd
    );

    const addNewQuizClassroom = useCallback(
        async (payload: IQuizClassroomAddPayload): Promise<QuizClassroom | null> => {
            const action = await dispatch(addQuizClassroom(payload));
            return addQuizClassroom.fulfilled.match(action) ? action.payload : null;
        },
        [dispatch]
    );

    return { addedQuizClassroom: data, status, error, addNewQuizClassroom };
}
