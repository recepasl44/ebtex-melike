import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { fetchQuestions } from '../../../slices/questions/list/thunk';
import { ListQuestionsResponse, QuestionsListArg } from '../../../types/questions/list';
import { QuestionsListStatus } from '../../../enums/questions/list'

export function useQuestionsList(params: QuestionsListArg) {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState<number>(params.page || 1);
  const [pageSize, setPageSize] = useState<number>(params.pageSize || 10);
  const [filter, setFilter] = useState<any>(null);

  const { data, meta, status, error } = useSelector((state: RootState) => state.questionsList);

  const { enabled, ...otherParams } = params;
  useEffect(() => {
    if (!enabled) return;

    dispatch(fetchQuestions({
      ...otherParams,
      filter,
    }));
  }, [enabled, filter, dispatch, otherParams.program_id, otherParams.page, otherParams.pageSize]);


  const loading = status === QuestionsListStatus.LOADING;
  const questionsData: ListQuestionsResponse['data'] = data || [];
  const paginationMeta = meta;
  const totalPages = paginationMeta ? paginationMeta.last_page : 1;
  const totalItems = paginationMeta ? paginationMeta.total : 0;

  return {
    questionsData,
    loading,
    error,
    page,
    setPage,
    pageSize,
    setPageSize,
    filter,
    setFilter,
    totalPages,
    totalItems,
  };
}
