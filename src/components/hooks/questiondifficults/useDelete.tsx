import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { deleteQuestionDifficult } from '../../../slices/questiondifficults/delete/thunk';

export function useQuestionDifficultDelete() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector((state: RootState) => state.questionDifficultDelete);

    const deleteExistingQuestionDifficult = useCallback(
        async (questionDifficultId: number) => {
            const resultAction = await dispatch(deleteQuestionDifficult(questionDifficultId));
            if (deleteQuestionDifficult.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { deletedQuestionDifficult: data, status, error, deleteExistingQuestionDifficult };
}
