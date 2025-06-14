import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { updateExamRelevance } from '../../../slices/examrelevances/update/thunk';
import { ExamRelevanceUpdatePayload } from '../../../types/examrelevances/update';

export function useExamRelevanceUpdate() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector((state: RootState) => state.examRelevanceUpdate);

    const updateExistingExamRelevance = useCallback(
        async (payload: ExamRelevanceUpdatePayload) => {
            const resultAction = await dispatch(updateExamRelevance(payload));
            if (updateExamRelevance.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { updatedExamRelevance: data, status, error, updateExistingExamRelevance };
}
