import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { deleteExamRelevance } from '../../../slices/examrelevances/delete/thunk';

export function useExamRelevanceDelete() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector((state: RootState) => state.examRelevanceDelete);

    const deleteExistingExamRelevance = useCallback(
        async (examRelevanceId: number) => {
            const resultAction = await dispatch(deleteExamRelevance(examRelevanceId));
            if (deleteExamRelevance.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { deletedExamRelevance: data, status, error, deleteExistingExamRelevance };
}
