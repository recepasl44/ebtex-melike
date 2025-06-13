import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { showOtherIncome } from '../../../slices/otherIncome/show/thunk';

export function useOtherIncomeShow(id: number) {
  const dispatch = useDispatch<AppDispatch>();

  const { data, status, error } = useSelector(
    (state: RootState) => state.otherIncomeShow
  );

  useEffect(() => {
    dispatch(showOtherIncome(id));
  }, [dispatch, id]);

  return { detail: data, status, error };
}
