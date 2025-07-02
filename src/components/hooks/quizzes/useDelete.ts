import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { deleteQuiz } from '../../../slices/quizzes/delete/thunk';

export function useQuizDelete() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.quizzesDelete);

  const deleteExistingQuiz = useCallback(
    async (quizId: number) => {
      const resultAction = await dispatch(deleteQuiz(quizId));
      if (deleteQuiz.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { deletedQuiz: data, status, error, deleteExistingQuiz };
}
