import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { addQuestionType } from '../../../slices/questiontypes/add/thunk';
import { QuestionTypeAddPayload } from '../../../types/questiontypes/add';

export function useQuestionTypeAdd() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector((state: RootState) => state.questionTypeAdd);

    const addNewQuestionType = useCallback(
        async (payload: QuestionTypeAddPayload) => {
            const resultAction = await dispatch(addQuestionType(payload));
            if (addQuestionType.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { addedQuestionType: data, status, error, addNewQuestionType };
}
