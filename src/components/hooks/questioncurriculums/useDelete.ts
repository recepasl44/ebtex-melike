import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { deleteQuestionCurriculum } from '../../../slices/questioncurriculums/delete/thunk';

export function useQuestionCurriculumsDelete() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.questioncurriculumsDelete);

  const deleteExistingQuestionCurriculum = useCallback(
    async (id: number) => {
      const result = await dispatch(deleteQuestionCurriculum(id));
      if (deleteQuestionCurriculum.fulfilled.match(result)) {
        return result.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { deletedQuestionCurriculum: data, status, error, deleteExistingQuestionCurriculum };
}
