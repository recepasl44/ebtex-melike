import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { updateQuestionCurriculum } from '../../../slices/questioncurriculums/update/thunk';
import { QuestionCurriculumsUpdatePayload } from '../../../types/questioncurriculums/update';

export function useQuestionCurriculumsUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.questioncurriculumsUpdate);

  const updateExistingQuestionCurriculum = useCallback(
    async (payload: QuestionCurriculumsUpdatePayload) => {
      const result = await dispatch(updateQuestionCurriculum(payload));
      if (updateQuestionCurriculum.fulfilled.match(result)) {
        return result.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { updatedQuestionCurriculum: data, status, error, updateExistingQuestionCurriculum };
}
