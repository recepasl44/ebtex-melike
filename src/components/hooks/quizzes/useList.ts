import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/rootReducer';
import { AppDispatch } from '../../../store';
import { fetchQuizzes } from '../../../slices/quizzes/list/thunk';
import { QuizzesListArg } from '../../../types/quizzes/list';
import QuizzesListStatus from '../../../enums/quizzes/list';

export function useQuizzesList(params: QuizzesListArg) {
  const dispatch = useDispatch<AppDispatch>();
  const { data, links, meta, status, error } = useSelector((state: RootState) => state.quizzesList);
  const [page, setPage] = useState<number>(params.page || 1);
  const [paginate, setPaginate] = useState<number>(params.pageSize || 25);
  const [filter, setFilter] = useState<any>(null);
  
  const initialFetchDone = useRef(false);

  useEffect(() => {
    if (params?.enabled === false) return;
    
    const { enabled, ...restParams } = params;
    const query: QuizzesListArg = {
      ...restParams,
      page,
      paginate,
      filter,
      status: params.status,
    };
    
    dispatch(fetchQuizzes(query));
    initialFetchDone.current = true;
    
  // Tüm filtre parametrelerini dependency array'e ekleyin
  }, [
    dispatch, 
    filter, 
    page, 
    paginate, 
    params.enabled,
    params.start_date,
    params.end_date,
    params.quiz_type_id,
    params.exam_name,
    params.source_id,
    params.status,
    params.program_id,
  ]);

  const loading = status === QuizzesListStatus.LOADING;
  const quizzesData = data || [];
  const totalPages = meta ? meta.last_page : 1;
  const totalItems = meta ? meta.total : 0;

  return {
    quizzesData,
    links,
    meta,
    loading,
    error,
    page,
    setPage,
    paginate,
    setPaginate,
    filter,
    setFilter,
    totalPages,
    totalItems,
  };
}