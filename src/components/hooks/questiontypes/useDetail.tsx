import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { fetchQuestionType } from '../../../slices/questiontypes/detail/thunk';

export function useQuestionTypeShow() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector(
        (state: RootState) => state.questionTypeShow
    );

    const getQuestionType = useCallback(async (questionTypeId: number) => {
        const resultAction = await dispatch(fetchQuestionType(questionTypeId));
        if (fetchQuestionType.fulfilled.match(resultAction)) {
            return resultAction.payload;
        }
        return null;
    }, [dispatch]);

    return { questionType: data, status, error, getQuestionType };
}
export default useQuestionTypeShow;
