import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { fetchQuestionCurriculumsDetail } from '../../../slices/questioncurriculums/detail/thunk';

export function useQuestionCurriculumsDetail() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.questioncurriculumsDetail);

  const getQuestionCurriculumsDetail = useCallback(
    async (id: number) => {
      const result = await dispatch(fetchQuestionCurriculumsDetail(id));
      if (fetchQuestionCurriculumsDetail.fulfilled.match(result)) {
        return result.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { questionCurriculum: data, status, error, getQuestionCurriculumsDetail };
}
