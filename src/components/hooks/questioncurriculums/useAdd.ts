import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { addQuestionCurriculum } from '../../../slices/questioncurriculums/add/thunk';
import { QuestionCurriculumsAddPayload } from '../../../types/questioncurriculums/add';

export function useQuestionCurriculumsAdd() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.questioncurriculumsAdd);

  const addNewQuestionCurriculum = useCallback(
    async (payload: QuestionCurriculumsAddPayload) => {
      const result = await dispatch(addQuestionCurriculum(payload));
      if (addQuestionCurriculum.fulfilled.match(result)) {
        return result.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { addedQuestionCurriculum: data, status, error, addNewQuestionCurriculum };
}
