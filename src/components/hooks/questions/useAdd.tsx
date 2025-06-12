import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { addQuestion } from '../../../slices/questions/add/thunk';
import { QuestionsAddPayload } from '../../../types/questions/add';

export function useQuestionAdd() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.questionsAdd);

  const addNewQuestion = useCallback(
    async (payload: QuestionsAddPayload) => {
      const resultAction = await dispatch(addQuestion(payload));
      if (addQuestion.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { addedQuestion: data, status, error, addNewQuestion };
}
