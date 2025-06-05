import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { updateQuestionType } from '../../../slices/questiontypes/update/thunk';
import { QuestionTypeUpdatePayload } from '../../../types/questiontypes/update';

export function useQuestionTypeUpdate() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector((state: RootState) => state.questionTypeUpdate);

    const updateExistingQuestionType = useCallback(
        async (payload: QuestionTypeUpdatePayload) => {
            const resultAction = await dispatch(updateQuestionType(payload));
            if (updateQuestionType.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { updatedQuestionType: data, status, error, updateExistingQuestionType };
}
