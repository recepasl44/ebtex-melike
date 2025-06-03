import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";

import { addQuizTime } from "../../../slices/quizTimes/add/thunk";
import { IQuizTimeAddPayload } from "../../../types/quizTimes/add";

export function useQuizTimesAdd() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector(
        (state: RootState) => state.quizTimeAdd
    );

    const addNewQuizTime = useCallback(
        async (payload: IQuizTimeAddPayload) => {
            const resultAction = await dispatch(addQuizTime(payload));
            if (addQuizTime.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { addedQuizTime: data, status, error, addNewQuizTime };
}
