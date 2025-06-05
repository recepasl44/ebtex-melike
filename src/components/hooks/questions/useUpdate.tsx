import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { updateQuestion } from '../../../slices/questions/update/thunk';
import { QuestionsUpdatePayload } from '../../../types/questions/update';

export function useQuestionUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.questionsUpdate);

  const updateExistingQuestion = useCallback(
    async (payload: QuestionsUpdatePayload) => {
      const resultAction = await dispatch(updateQuestion(payload));
      if (updateQuestion.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { updatedQuestion: data, status, error, updateExistingQuestion };
}
