import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { updateQuestionDifficult } from '../../../slices/questiondifficults/update/thunk';
import { QuestionDifficultUpdatePayload } from '../../../types/questiondifficults/update';

export function useQuestionDifficultUpdate() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector((state: RootState) => state.questionDifficultUpdate);

    const updateExistingQuestionDifficult = useCallback(
        async (payload: QuestionDifficultUpdatePayload) => {
            const resultAction = await dispatch(updateQuestionDifficult(payload));
            if (updateQuestionDifficult.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { updatedQuestionDifficult: data, status, error, updateExistingQuestionDifficult };
}
