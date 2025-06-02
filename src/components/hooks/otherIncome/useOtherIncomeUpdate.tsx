import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { updateOtherIncome } from '../../../slices/otherIncome/update/thunk';
import { OtherIncomeUpdatePayload } from '../../../types/otherIncome/update';

export function useOtherIncomeUpdate() {
  const dispatch = useDispatch<AppDispatch>();

  const { data, status, error } = useSelector(
    (state: RootState) => state.otherIncomeUpdate
  );

  const update = useCallback(
    async (payload: OtherIncomeUpdatePayload) => {
      const resultAction = await dispatch(updateOtherIncome(payload));
      if (updateOtherIncome.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { updated: data, status, error, update };
}
