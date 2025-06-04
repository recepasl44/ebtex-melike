import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { addOtherIncome } from '../../../slices/otherIncome/add/thunk';
import { OtherIncomeAddPayload } from '../../../types/otherIncome/add';

export function useOtherIncomeAdd() {
  const dispatch = useDispatch<AppDispatch>();

  const { data, status, error } = useSelector(
    (state: RootState) => state.otherIncomeAdd
  );

  const addNew = useCallback(
    async (payload: OtherIncomeAddPayload) => {
      const resultAction = await dispatch(addOtherIncome(payload));
      if (addOtherIncome.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { added: data, status, error, addNew };
}
