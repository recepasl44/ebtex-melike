import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { deleteOtherIncome } from '../../../slices/otherIncome/delete/thunk';

export function useOtherIncomeDelete() {
  const dispatch = useDispatch<AppDispatch>();

  const { data, status, error } = useSelector(
    (state: RootState) => state.otherIncomeDelete
  );

  const remove = useCallback(
    async (id: number) => {
      const resultAction = await dispatch(deleteOtherIncome(id));
      if (deleteOtherIncome.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { deletedId: data, status, error, remove };
}
