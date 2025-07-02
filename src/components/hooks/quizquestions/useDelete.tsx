import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { deleteQuizQuestion } from '../../../slices/quizquestions/delete/thunk';

export function useQuizQuestionDelete() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.quizQuestionDelete);

  const deleteExistingQuizQuestion = useCallback(
    async (id: number) => {
      const resultAction = await dispatch(deleteQuizQuestion(id));
      if (deleteQuizQuestion.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { deletedQuizQuestion: data, status, error, deleteExistingQuizQuestion };
}
