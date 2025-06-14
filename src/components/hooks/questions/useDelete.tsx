import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { deleteQuestion } from '../../../slices/questions/delete/thunk';

export function useQuestionDelete() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.questionsDelete);

  const deleteExistingQuestion = useCallback(
    async (questionId: number) => {
      const resultAction = await dispatch(deleteQuestion(questionId));
      if (deleteQuestion.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { deletedQuestion: data, status, error, deleteExistingQuestion };
}
