import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { fetchExamRelevance } from '../../../slices/examrelevances/detail/thunk';

export function useExamRelevanceShow() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector(
        (state: RootState) => state.examRelevanceShow
    );

    const getExamRelevance = useCallback(async (examRelevanceId: number) => {
        const resultAction = await dispatch(fetchExamRelevance(examRelevanceId));
        if (fetchExamRelevance.fulfilled.match(resultAction)) {
            return resultAction.payload;
        }
        return null;
    }, [dispatch]);

    return { examRelevance: data, status, error, getExamRelevance };
}
export default useExamRelevanceShow;
