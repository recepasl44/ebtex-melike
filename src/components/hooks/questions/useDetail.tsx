import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { fetchQuestion } from '../../../slices/questions/detail/thunk';

export function useQuestionDetail() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.questionShow);

  const getQuestion = useCallback(async (questionId: number) => {
    const resultAction = await dispatch(fetchQuestion(questionId));
    if (fetchQuestion.fulfilled.match(resultAction)) {
      return resultAction.payload;
    }
    return null;
  }, [dispatch]);

  return { question: data, status, error, getQuestion };
}
