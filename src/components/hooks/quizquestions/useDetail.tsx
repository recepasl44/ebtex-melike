import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { fetchQuizQuestion } from '../../../slices/quizquestions/detail/thunk';

export function useQuizQuestionDetail() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.quizQuestionDetail);

  const getQuizQuestion = useCallback(async (id: number) => {
    const resultAction = await dispatch(fetchQuizQuestion(id));
    if (fetchQuizQuestion.fulfilled.match(resultAction)) {
      return resultAction.payload;
    }
    return null;
  }, [dispatch]);

  return { quizQuestion: data, status, error, getQuizQuestion };
}
