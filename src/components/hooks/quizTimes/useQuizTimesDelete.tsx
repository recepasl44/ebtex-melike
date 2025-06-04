import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { deleteQuizTime } from "../../../slices/quizTimes/delete/thunk";

export function useQuizTimesDelete() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector(
        (state: RootState) => state.quizTimeDelete
    );

    const removeQuizTime = useCallback(
        async (quizTimeId: number) => {
            const resultAction = await dispatch(deleteQuizTime(quizTimeId));
            if (deleteQuizTime.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { deleteQuizTimeId: data, status, error, removeQuizTime };
}
