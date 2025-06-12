
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { addQuizLevel } from "../../../slices/quizLevels/add/thunk";
import { IQuizLevelAddPayload } from "../../../types/quizLevels/add";

export function useQuizLevelsAdd() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector(
        (state: RootState) => state.levelAdd
    );

    const addNewQuizLevel = useCallback(
        async (payload: IQuizLevelAddPayload) => {
            const resultAction = await dispatch(addQuizLevel(payload));
            if (addQuizLevel.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { addedQuizLevel: data, status, error, addNewQuizLevel };
}
