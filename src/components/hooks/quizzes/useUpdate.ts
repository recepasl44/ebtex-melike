import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { updateQuiz } from '../../../slices/quizzes/update/thunk';
import { QuizzesUpdatePayload } from '../../../types/quizzes/update';

export function useQuizUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.quizzesUpdate);

  const updateExistingQuiz = useCallback(
    async (payload: QuizzesUpdatePayload) => {
      const resultAction = await dispatch(updateQuiz(payload));
      if (updateQuiz.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { updatedQuiz: data, status, error, updateExistingQuiz };
}
