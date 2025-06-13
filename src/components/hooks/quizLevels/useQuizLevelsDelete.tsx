import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { deleteQuizLevel } from "../../../slices/quizLevels/delete/thunk";

export function useQuizLevelsDelete() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector(
        (state: RootState) => state.levelDelete
    );

    const removeQuizLevel = useCallback(
        async (quizLevelId: number) => {
            const resultAction = await dispatch(deleteQuizLevel(quizLevelId));
            if (deleteQuizLevel.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { deleteQuizLevelId: data, status, error, removeQuizLevel };
}
