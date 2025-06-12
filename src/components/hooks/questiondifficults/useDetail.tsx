import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { fetchQuestionDifficult } from '../../../slices/questiondifficults/detail/thunk';

export function useQuestionDifficultShow() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector(
        (state: RootState) => state.questionDifficultShow
    );

    const getQuestionDifficult = useCallback(async (questionDifficultId: number) => {
        const resultAction = await dispatch(fetchQuestionDifficult(questionDifficultId));
        if (fetchQuestionDifficult.fulfilled.match(resultAction)) {
            return resultAction.payload;
        }
        return null;
    }, [dispatch]);

    return { questionDifficult: data, status, error, getQuestionDifficult };
}
export default useQuestionDifficultShow;
