import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { fetchQuestionCurriculums } from '../../../slices/questioncurriculums/list/thunk';
import { QuestionCurriculumsListArg } from '../../../types/questioncurriculums/list';
import QuestionCurriculumsListStatus from '../../../enums/questioncurriculums/list';

export function useQuestionCurriculumsList(params: QuestionCurriculumsListArg) {
  const dispatch = useDispatch<AppDispatch>();
  const { data, links, meta, status, error } = useSelector((state: RootState) => state.questioncurriculumsList);

  useEffect(() => {
    if (params?.enabled === false) return;
    dispatch(fetchQuestionCurriculums(params));
  }, [dispatch, params]);

  const loading = status === QuestionCurriculumsListStatus.LOADING;

  return { data, links, meta, loading, status, error };
}
