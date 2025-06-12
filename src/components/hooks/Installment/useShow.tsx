
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { showInstallment } from '../../../slices/Installment/show/thunk';
import { ShowInstallmentPayload } from '../../../types/Installment/show';

export function useShowInstallment() {
  const dispatch = useDispatch<AppDispatch>();

  const { data, status, error } = useSelector(
    (state: RootState) => state.showInstallment
  );

  const fetchOneInstallment = useCallback(async (payload: ShowInstallmentPayload) => {
    const result = await dispatch(showInstallment(payload));
    if (showInstallment.fulfilled.match(result)) {
      return result.payload;
    } else {
      return null;
    }
  }, [dispatch]);

  return {
    installment: data,
    status,
    error,
    fetchOneInstallment,
  };
}
