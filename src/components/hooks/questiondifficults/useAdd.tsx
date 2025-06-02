import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { addQuestionDifficult } from '../../../slices/questiondifficults/add/thunk';
import { QuestionDifficultAddPayload } from '../../../types/questiondifficults/add';

export function useQuestionDifficultAdd() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector((state: RootState) => state.questionDifficultAdd);

    const addNewQuestionDifficult = useCallback(
        async (payload: QuestionDifficultAddPayload) => {
            const resultAction = await dispatch(addQuestionDifficult(payload));
            if (addQuestionDifficult.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { addedQuestionDifficult: data, status, error, addNewQuestionDifficult };
}
