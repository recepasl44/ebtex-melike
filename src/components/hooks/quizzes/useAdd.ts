import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { addQuiz } from '../../../slices/quizzes/add/thunk';
import { QuizzesAddPayload } from '../../../types/quizzes/add';

export function useQuizAdd() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.quizzesAdd);

  const addNewQuiz = useCallback(
    async (payload: QuizzesAddPayload) => {
      const resultAction = await dispatch(addQuiz(payload));
      if (addQuiz.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { addedQuiz: data, status, error, addNewQuiz };
}
