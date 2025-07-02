import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { fetchQuiz } from '../../../slices/quizzes/detail/thunk';

export function useQuizDetail() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.quizzesDetail);

  const getQuiz = useCallback(
    async (quizId: number) => {
      const resultAction = await dispatch(fetchQuiz(quizId));
      if (fetchQuiz.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { quiz: data, status, error, getQuiz };
}
