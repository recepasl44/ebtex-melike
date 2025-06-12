import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { deleteQuestionType } from '../../../slices/questiontypes/delete/thunk';

export function useQuestionTypeDelete() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector((state: RootState) => state.questionTypeDelete);

    const deleteExistingQuestionType = useCallback(
        async (questionTypeId: number) => {
            const resultAction = await dispatch(deleteQuestionType(questionTypeId));
            if (deleteQuestionType.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { deletedQuestionType: data, status, error, deleteExistingQuestionType };
}
