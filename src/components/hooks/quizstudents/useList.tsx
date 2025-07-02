import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { fetchQuizStudents } from '../../../slices/quizstudents/list/thunk';
import { QuizStudentData, QuizStudentsListArg } from '../../../types/quizstudents/list';
import QuizStudentsListStatus from '../../../enums/quizstudents/list';

export function useQuizStudentsList(params: QuizStudentsListArg) {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState(params.page || 1);
  const [paginate, setPaginate] = useState<number>(params.pageSize || 25);
  const [filter, setFilter] = useState<any>(null);
  
  const prevParams = useRef(params);
  const initialFetchDone = useRef(false);

  const { data, meta, status, error } = useSelector((state: RootState) => state.quizstudentsList);

  useEffect(() => {
    const { enabled = true } = params;
    if (!enabled) return;
    
    // Check if any params have changed to trigger a new request
    const paramsChanged = 
      prevParams.current.student_name !== params.student_name ||
      prevParams.current.student_class !== params.student_class ||
      prevParams.current.exam_status !== params.exam_status ||
      prevParams.current.quiz_id !== params.quiz_id ||
      prevParams.current.program_id !== params.program_id ||
      prevParams.current.start_date !== params.start_date ||
      prevParams.current.end_date !== params.end_date ||
      prevParams.current.quiz_type_id !== params.quiz_type_id ||
      prevParams.current.exam_name !== params.exam_name ||
      prevParams.current.publication_name !== params.publication_name ||
      prevParams.current.status !== params.status ||
      !initialFetchDone.current;
      
    if (paramsChanged || page !== prevParams.current.page || paginate !== prevParams.current.pageSize) {
      const query: QuizStudentsListArg = {
        ...params,
        filter,
        page,
        paginate,
        per_page: paginate,
      };
      
      dispatch(fetchQuizStudents(query));
      initialFetchDone.current = true;
      prevParams.current = { ...params, page, pageSize: paginate };
    }
  }, [
    dispatch, 
    filter, 
    page, 
    paginate, 
    params.enabled,
    params.student_name,
    params.student_class,
    params.exam_status,
    params.quiz_id,
    params.program_id,
    params.start_date,
    params.end_date,
    params.quiz_type_id,
    params.exam_name,
    params.publication_name,
    params.status
  ]);

  return {
    quizStudentsData: data || [],
    loading: status === QuizStudentsListStatus.LOADING,
    error,
    page,
    setPage,
    paginate,
    setPaginate,
    filter,
    setFilter,
    totalPages: meta?.last_page || 1,
    totalItems: meta?.total || 0,
  };
}