import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { addQuizQuestion } from '../../../slices/quizquestions/add/thunk';
import { QuizQuestionsAddPayload } from '../../../types/quizquestions/add';

export function useQuizQuestionAdd() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.quizQuestionAdd);

  const addNewQuizQuestion = useCallback(
    async (payload: QuizQuestionsAddPayload) => {
      const resultAction = await dispatch(addQuizQuestion(payload));
      if (addQuizQuestion.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { addedQuizQuestion: data, status, error, addNewQuizQuestion };
}
