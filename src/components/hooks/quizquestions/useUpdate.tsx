import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { updateQuizQuestion } from '../../../slices/quizquestions/update/thunk';
import { QuizQuestionsUpdatePayload } from '../../../types/quizquestions/update';

export function useQuizQuestionUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.quizQuestionUpdate);

  const updateExistingQuizQuestion = useCallback(
    async (payload: QuizQuestionsUpdatePayload) => {
      const resultAction = await dispatch(updateQuizQuestion(payload));
      if (updateQuizQuestion.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { updatedQuizQuestion: data, status, error, updateExistingQuizQuestion };
}
