import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { addExamRelevance } from '../../../slices/examrelevances/add/thunk';
import { ExamRelevanceAddPayload } from '../../../types/examrelevances/add';

export function useExamRelevanceAdd() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector((state: RootState) => state.examRelevanceAdd);

    const addNewExamRelevance = useCallback(
        async (payload: ExamRelevanceAddPayload) => {
            const resultAction = await dispatch(addExamRelevance(payload));
            if (addExamRelevance.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { addedExamRelevance: data, status, error, addNewExamRelevance };
}
