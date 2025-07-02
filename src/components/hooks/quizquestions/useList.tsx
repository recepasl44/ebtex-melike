import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { fetchQuizQuestions } from '../../../slices/quizquestions/list/thunk';
import {
  QuizQuestionsListArg,
  QuizQuestionsListItem,
  QuizQuestionsMeta
} from '../../../types/quizquestions/list';
import { QuizQuestionsListStatus } from '../../../enums/quizquestions/list';

export function useQuizQuestionsTable(params: QuizQuestionsListArg & { page: number; pageSize: number }) {
  const dispatch = useDispatch<AppDispatch>();

  const { data, meta, status, error } = useSelector((state: RootState) => state.quizQuestionList);

  useEffect(() => {
    if (!params.enabled || !params.quiz_id) return;

    const query: QuizQuestionsListArg = {
      quiz_id: params.quiz_id,
      page: params.page,
      pageSize: params.pageSize,
      per_page: params.pageSize,
    };

    dispatch(fetchQuizQuestions(query));
  }, [params.quiz_id, params.enabled, params.page, params.pageSize, dispatch]);

  const loading = status === QuizQuestionsListStatus.LOADING;
  const quizQuestions: QuizQuestionsListItem[] = data || [];
  const paginationMeta: QuizQuestionsMeta | null = meta;
  const totalPages = paginationMeta?.last_page ?? 1;
  const totalItems = paginationMeta?.total ?? 0;

  return {
    quizQuestions,
    loading,
    error,
    totalPages,
    totalItems,
  };
}
